import { Component, ElementRef, Input, Renderer2 } from '@angular/core';
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

  @Input() reversed = false;

  imageIndex = 0;


  delayBetweenImages: number = 3000;
  autoScroll: any;

  constructor(private el: ElementRef, private renderer: Renderer2){}


  ngOnInit(): void {

    this.startAutoScroll();
  }


  isElementInViewport(): boolean {
    const rect = this.el.nativeElement.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }



  incrementImageIndex() {
    this.imageIndex = (this.imageIndex + 1) % this.project.images.length;
  }

  decrementImageIndex() {
    this.imageIndex = (this.imageIndex - 1) % this.project.images.length;
    if (this.imageIndex < 0) {
      this.imageIndex = this.project.images.length - 1;
    }
  }


  startAutoScroll() {
    this.autoScroll = setInterval(() => {
      if (this.isElementInViewport()) {
        this.incrementImageIndex();
      }
    }, this.delayBetweenImages);
  }

  stopAutoScroll() {
    clearInterval(this.autoScroll);
  }


}
