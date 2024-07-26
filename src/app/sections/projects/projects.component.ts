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

}
