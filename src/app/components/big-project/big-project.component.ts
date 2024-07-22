import { Component, Input } from '@angular/core';
import { Project } from '../../models/project';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-big-project',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './big-project.component.html',
  styleUrl: './big-project.component.scss'
})
export class BigProjectComponent {

  @Input() project!: Project;

}
