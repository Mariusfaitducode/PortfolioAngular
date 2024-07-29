import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { GameOfLifeService } from '../../services/game-of-life.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { GameOfLifeComponent } from "../../components/game-of-life/game-of-life.component";

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    GameOfLifeComponent
],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent {

  constructor(private translate: TranslateService) {}



  // Hero texts 

  showHeroSpan = false;
  showHeroSubtitle = false;
  showHeroName = false;

  subtitlesKey: string[] = ["STUDENT", "FREELANCE", "PASSION"];
  subtitles: string[] = [];

  currentIndex: number = 0;
  typingSpeed: number = 50;
  erasingSpeed: number = 10;
  delayBetweenTexts: number = 1500; // Delay before starting to erase
  dynamicText: string = '';

  showCursor: boolean = false;

  interval: any;

  

  ngOnInit(): void {
    
    console.log(this.subtitles)

    setTimeout(() => {
      this.showHeroSpan = true;
    }, 400);
    setTimeout(() => {
      this.showHeroName = true;
    }, 600);
    setTimeout(() => {

      this.subtitles = this.subtitlesKey.map(key => this.translate.instant(key));

      // this.showHeroSubtitle = true;
      this.typeText();

      this.translate.onLangChange.subscribe(() => {
        this.subtitles = this.subtitlesKey.map(key => this.translate.instant(key));
  
        this.dynamicText = '';
        // this.currentIndex = 0;
        clearInterval(this.interval);
        this.typeText();
      })
      
    }, 2000);
    
  }



  // Hero texts

  typeText(i: number = 0): void {
    if (i < this.subtitles[this.currentIndex].length) {

      this.showCursor = true;
      this.dynamicText += this.subtitles[this.currentIndex].charAt(i);
      this.interval = setTimeout(() => this.typeText(i + 1), this.typingSpeed);
    
    } else {

      this.showCursor = false;
      this.interval = setTimeout(() => this.eraseText(), this.delayBetweenTexts);
    }
  }

  eraseText(): void {
    if (this.dynamicText.length > 0) {
      this.showCursor = true;
      this.dynamicText = this.dynamicText.substring(0, this.dynamicText.length - 1);
      this.interval = setTimeout(() => this.eraseText(), this.erasingSpeed);
    } else {
      this.currentIndex = (this.currentIndex + 1) % this.subtitles.length;
      this.interval = setTimeout(() => this.typeText(), this.typingSpeed);
    }
  }

  
  
}
