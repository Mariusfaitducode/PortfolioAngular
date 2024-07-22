import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { NavbarHeaderComponent } from './sections/navbar-header/navbar-header.component';
import { HeroComponent } from './sections/hero/hero.component';
import { AboutComponent } from './sections/about/about.component';
import { ProjectsComponent } from './sections/projects/projects.component';
import { SkillsComponent } from './sections/skills/skills.component';
import { ContactComponent } from './sections/contact/contact.component';
import { FooterComponent } from './sections/footer/footer.component';
import { Project } from './models/project';
import { Skill } from './models/skill';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, 
    NavbarHeaderComponent,
    HeroComponent,
    AboutComponent,
    ProjectsComponent,
    SkillsComponent,
    ContactComponent,
    FooterComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'PortfolioAngular';


  bigProjects : Project[] = [];
  smallProjects : Project[] = [];

  skills : Skill[] = [];

  skillsByCategory : any = {};

  constructor(private dataService : DataService){}


  ngOnInit(): void {

    this.dataService.getSkills().subscribe((dataSkills: any) => {
      console.log(dataSkills);

      this.dataService.getProjects().subscribe((dataProjects: any) => {

        console.log(dataProjects);

        for (let skill of dataSkills.data){
          this.skills.push(new Skill(skill));
        }

        let projects : Project[] = [];

        for (let project of dataProjects.data){
          let newProject = new Project(project);

          for (let skill of project.attributes.skills.data){
            let skillProject = this.skills.find((sk) => sk.id == skill.id);
            if (skillProject){
              newProject.skills.push(skillProject);
            }
          }

          projects.push(newProject);
        }

        console.log(projects);
        console.log(this.skills);

        this.bigProjects = projects.filter((project) => project.bigProject);
        this.smallProjects = projects.filter((project) => !project.bigProject);


        for (let skill of this.skills){
          if (!this.skillsByCategory[skill.category]){
            this.skillsByCategory[skill.category] = [];
          }

          this.skillsByCategory[skill.category].push(skill);
        }
      });
    });
  }





}
