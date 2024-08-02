import { Component, Input } from '@angular/core';
import { Project } from '../../models/project';
import { CommonModule } from '@angular/common';
import { CardProjectComponent } from '../../components/card-project/card-project.component';
import { BigProjectComponent } from '../../components/big-project/big-project.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, 
    CardProjectComponent, 
    BigProjectComponent,
    TranslateModule
  ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {


  @Input() allProjects: Project[] = [];
  // filteredProjects: Project[] = [];

  @Input() bigProjects: Project[] = [];
  @Input() smallProjects: Project[] = [];

  
  currentIndexSmallProjects = 0;

  filter = 'all';

  ngOnInit(): void{

    
  }


  changeFilter(filter: string) {
    this.filter = filter;
    
    this.bigProjects = this.allProjects.filter((project) => project.bigProject);
    this.smallProjects = this.allProjects.filter((project) => !project.bigProject);

    if (filter !== 'all') {
      this.bigProjects = this.bigProjects.filter((project) => project.category === filter);
      this.smallProjects = this.smallProjects.filter((project) => project.category === filter);
    }
  }


  onScroll(event: Event): void {

    const container = document.querySelector('.projects-container')! as HTMLElement;
    const maxScrollLeft = container.scrollWidth - container.clientWidth;

    if (container.scrollLeft >= maxScrollLeft) {
      container.scrollLeft = 5;
    }
    else if (container.scrollLeft <= 0) {
      container.scrollLeft = maxScrollLeft-5;
    }

    this.updateCurrentIndex(container);

  }

  updateCurrentIndex(container : HTMLElement): void {
    
    if (container) {
      const projects = Array.from(container.children);

      // console.log(projects);

      const containerRect = container.getBoundingClientRect();
      this.currentIndexSmallProjects = projects.findIndex((project) => {
        const projectRect = project.getBoundingClientRect();

        // console.log(projectRect.left, containerRect.left);

        // const projectWidth = projectRect.width;

        return (
          projectRect.left >= - projectRect.width / 2 &&
          projectRect.right <= window.innerWidth + projectRect.width / 2
        );
      });

      // console.log(this.currentIndexSmallProjects);
    }
  }

}
