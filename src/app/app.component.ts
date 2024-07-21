import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { NavbarHeaderComponent } from './components/navbar-header/navbar-header.component';
import { HeroComponent } from './components/hero/hero.component';
import { AboutComponent } from './components/about/about.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { SkillsComponent } from './components/skills/skills.component';
import { ContactComponent } from './components/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';
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


  projects : Project[] = [];
  skills : Skill[] = [];


  constructor(private dataService : DataService){}


  ngOnInit(): void {

    

    this.dataService.getSkills().subscribe((dataSkills: any) => {
      console.log(dataSkills);

      this.dataService.getProjects().subscribe((dataProjects: any) => {

        console.log(dataProjects);

        for (let skill of dataSkills.data){
          this.skills.push(new Skill(skill));
        }

        for (let project of dataProjects.data){
          let newProject = new Project(project);

          for (let skill of project.attributes.skills.data){
            let skillProject = this.skills.find((sk) => sk.id == skill.id);
            if (skillProject){
              newProject.skills.push(skillProject);
            }
          }

          this.projects.push(newProject);
        }

        console.log(this.projects);
        console.log(this.skills);
      });
    });

    
  }



}
