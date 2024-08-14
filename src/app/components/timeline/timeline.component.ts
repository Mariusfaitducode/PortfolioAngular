import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Timeline } from '../../models/timeline';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.scss'
})
export class TimelineComponent {

  constructor(private translate: TranslateService) { }


  @Input() timelineEvents: Timeline[] = [];

  @Input() visibleExperiences : Timeline[] = [];

  filter = 'all';

  actualDate = new Date();


  ngOnInit(){
    

    // this.visibleExperiences = [...this.timelineEvents];
  }


  filterExperiences(type: string) {
    this.filter = type;

    if (type === 'all') {
      this.visibleExperiences = [...this.timelineEvents];
    } else {
      this.visibleExperiences = this.timelineEvents.filter((experience) => experience.type === type);
    }
  }


  getTranslatedTitle(timelineEvent: Timeline){
    return this.translate.currentLang === 'fr' ? timelineEvent.title : timelineEvent.titleEn;
  }

  getTranslatedDescription(timelineEvent: Timeline){
    return this.translate.currentLang === 'fr' ? timelineEvent.description : timelineEvent.descriptionEn;
  }



  getTranslatedStartDate(timelineEvent: Timeline){

    if (this.translate.currentLang === 'fr'){
      return timelineEvent.startDate.toLocaleDateString('fr-FR', { year: 'numeric', month: 'long' });
    }
    else{
      return timelineEvent.startDate.toLocaleDateString('en-EN', { year: 'numeric', month: 'long' });
    }
    // return this.translate.currentLang === 'fr' ? timelineEvent.startDate : timelineEvent.startDateEn;
  }

  getTranslatedEndDate(timelineEvent: Timeline){
    // return this.translate.currentLang === 'fr' ? timelineEvent.endDate : timelineEvent.endDateEn;

    if (this.translate.currentLang === 'fr'){
      return timelineEvent.endDate.toLocaleDateString('fr-FR', { year: 'numeric', month: 'long' });
    }
    else{
      return timelineEvent.endDate.toLocaleDateString('en-EN', { year: 'numeric', month: 'long' });
    }
  }
}
