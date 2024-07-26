import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { GameOfLifeService } from '../../services/game-of-life.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule
  ],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent {

  constructor(private gameOfLifeService: GameOfLifeService, private translate: TranslateService) {}

  // Game of life

  numRows = 30;
  numColumns = 30;
  cells: boolean[] = [];

  running = true;
  speed = 1;
  // interval: any;

  cellSize = 20;

  gameInfoVisible = false;


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
    

    this.cells = this.gameOfLifeService.createEmptyGrid(this.numRows, this.numColumns);
    this.gameOfLifeService.startGame(this.cells, this.numRows, this.numColumns);

    this.adjustCellSize();

    


  }

  ngOnDestroy(): void {
    this.gameOfLifeService.stopGame();
  }


  // Game of life

  toggleCellState(index: number): void {
    this.gameOfLifeService.toggleCellState(this.cells, index);
  }

  // Utile pour améliorer les performances
  trackByFn(index: number): number {
    return index;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.adjustCellSize();
  }

  adjustCellSize(): void {
    if (window.innerWidth / window.innerHeight > 1) {
      this.cellSize = window.innerWidth / this.numColumns;
    } else {
      this.cellSize = window.innerHeight / this.numRows;
    }
  }


  // Controller


  toggleGame(){
    console.log('toggleGame');
    if (this.running) {
      this.stopGame();
    } else {
      this.startGame();
    }
  }

  startGame(): void {
    this.running = true;
    this.gameOfLifeService.updateInterval(this.cells, this.numRows, this.numColumns, this.speed);
  }

  stopGame(): void {
    this.running = false;
    // clearInterval(this.interval);
    this.gameOfLifeService.stopGame();
  }

  updateSpeed(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.speed = Number(target.value);
    if (this.running) {
      this.gameOfLifeService.updateInterval(this.cells, this.numRows, this.numColumns, this.speed);
    }
  }

  toggleGameInfo(): void {

    console.log('toggleGameInfo');
    this.gameInfoVisible = !this.gameInfoVisible;
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
