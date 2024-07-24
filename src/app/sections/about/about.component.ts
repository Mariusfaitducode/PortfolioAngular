import { Component, Input } from '@angular/core';
import { TimelineComponent } from '../../components/timeline/timeline.component';
import { MarscodeComponent } from '../../components/marscode/marscode.component';
import { Timeline } from '../../models/timeline';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [TimelineComponent, MarscodeComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {

  @Input() timelineEvents: Timeline[] = [];

}
