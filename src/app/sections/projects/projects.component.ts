import { Component, Input } from '@angular/core';
import { Project } from '../../models/project';
import { CommonModule } from '@angular/common';
import { CardProjectComponent } from '../../components/card-project/card-project.component';
import { BigProjectComponent } from '../../components/big-project/big-project.component';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, 
    CardProjectComponent, 
    BigProjectComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {


  // @Input() projects: Project[] = [];

  @Input() bigProjects: Project[] = [];
  @Input() smallProjects: Project[] = [];



  ngOnInit(): void{

    
  }

}
