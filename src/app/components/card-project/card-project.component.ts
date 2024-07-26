import { Component, Input } from '@angular/core';
import { Project } from '../../models/project';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-card-project',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './card-project.component.html',
  styleUrl: './card-project.component.scss'
})
export class CardProjectComponent {

  constructor(private translate: TranslateService) { }

  @Input() project!: Project;


  getTranslatedDescription(){
    return this.translate.currentLang === 'fr' ? this.project.smallDescription : this.project.smallDescriptionEn;
  }
}
