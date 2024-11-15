import { Component, Input } from '@angular/core';
import { TimelineComponent } from '../../components/timeline/timeline.component';
import { MarscodeComponent } from '../../components/marscode/marscode.component';
import { Timeline } from '../../models/timeline';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    CommonModule,
    TimelineComponent, 
    MarscodeComponent, 
    TranslateModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
  
  constructor(public translate: TranslateService) { }

  @Input() timelineEvents: Timeline[] = [];


  

}
