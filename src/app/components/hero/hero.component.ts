import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { GameOfLifeService } from '../../services/game-of-life.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent {


  numRows = 30;
  numColumns = 30;
  cells: boolean[] = [];

  running = true;
  speed = 1;
  // interval: any;

  cellSize = 20;

  gameInfoVisible = false;




  showHeroSpan = false;
  showHeroTitle = false;
  showHeroName = false;


  constructor(private gameOfLifeService: GameOfLifeService) {}

  ngOnInit(): void {

    
    setTimeout(() => {
      this.showHeroSpan = true;
    }, 400);
    setTimeout(() => {
      this.showHeroName = true;
    }, 600);
    setTimeout(() => {
      this.showHeroTitle = true;
    }, 700);
    

    this.cells = this.gameOfLifeService.createEmptyGrid(this.numRows, this.numColumns);
    this.gameOfLifeService.startGame(this.cells, this.numRows, this.numColumns);

    this.adjustCellSize();


    
  }

  ngOnDestroy(): void {
    this.gameOfLifeService.stopGame();
  }

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

  
}
