import { Component, ElementRef, Input, Renderer2 } from '@angular/core';
import { Project } from '../../models/project';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-big-project',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './big-project.component.html',
  styleUrl: './big-project.component.scss'
})
export class BigProjectComponent {

  @Input() project!: Project;

  @Input() reversed = false;

  // imageIndex = 0;


  delayBetweenImages: number = 3000;
  autoScroll: any;

  imageIndex = 0;
  previousIndex = 0;
  direction = '';
  currentImage = '';
  previousImage = '';

  constructor(private el: ElementRef, private renderer: Renderer2, private translate : TranslateService){}


  ngOnInit(): void {

    this.currentImage = 'assets' + this.project.images[this.imageIndex];
    // this.startAutoScroll();
  }


  

  // Image transition

  incrementImageIndex() {
    this.previousIndex = this.imageIndex;
    this.imageIndex = (this.imageIndex + 1) % this.project.images.length;
    this.direction = 'right';
    this.updateImages();
  }

  decrementImageIndex() {
    this.previousIndex = this.imageIndex;
    this.imageIndex = (this.imageIndex - 1) % this.project.images.length;
    if (this.imageIndex < 0) {
      this.imageIndex = this.project.images.length - 1;
    }
    this.direction = 'left';
    this.updateImages();
  }

  updateImages() {
    this.previousImage = this.currentImage;
    this.currentImage = 'assets' + this.project.images[this.imageIndex];
    // setTimeout(() => {
    //   this.previousImage = '';
    // }, 1000); // Duration of the CSS transition
    this.direction = '';
  }
  

  // Scroll

  isElementInViewport(): boolean {
    const rect = this.el.nativeElement.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  startAutoScroll() {
    // this.autoScroll = setInterval(() => {
    //   if (this.isElementInViewport()) {
    //     this.incrementImageIndex();
    //   }
    // }, this.delayBetweenImages);
  }

  stopAutoScroll() {
    clearInterval(this.autoScroll);
  }


  getTranslatedDescription(){
    return this.translate.currentLang === 'fr' ? this.project.smallDescription : this.project.smallDescriptionEn;
  }
}
