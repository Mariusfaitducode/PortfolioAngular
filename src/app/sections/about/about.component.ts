import { Component } from '@angular/core';
import { TimelineComponent } from '../../components/timeline/timeline.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [TimelineComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {

}
