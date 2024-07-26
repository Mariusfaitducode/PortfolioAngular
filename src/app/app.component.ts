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
import { Timeline } from './models/timeline';

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


  allProjects : Project[] = [];
  bigProjects : Project[] = [];
  smallProjects : Project[] = [];

  skills : Skill[] = [];

  timelineEvents : Timeline[] = [];

  // skillsByCategory : any = {};

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

        this.allProjects = projects;
        this.bigProjects = projects.filter((project) => project.bigProject);
        this.smallProjects = projects.filter((project) => !project.bigProject);


        // for (let skill of this.skills){
        //   if (!this.skillsByCategory[skill.category]){
        //     this.skillsByCategory[skill.category] = [];
        //   }

        //   this.skillsByCategory[skill.category].push(skill);
        // }

        this.dataService.getTimeline().subscribe((dataTimeline: any) => {
          console.log(dataTimeline);

          for (let timeline of dataTimeline.data){
            this.timelineEvents.push(new Timeline(timeline));
          }

          this.timelineEvents.sort((a, b) => {
            return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
          });
      
          this.timelineEvents.forEach((experience) => {
            experience.startDate = new Date(experience.startDate).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long' });
            if (experience.endDate) {
              experience.endDate = new Date(experience.endDate).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long' });
            } 
          });

          console.log(this.timelineEvents);
        });
      });
    });
  }





}
