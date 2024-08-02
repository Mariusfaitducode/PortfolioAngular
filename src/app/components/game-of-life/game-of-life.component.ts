import { Component, ElementRef, HostListener } from '@angular/core';
import { Cell, GameOfLifeService } from '../../services/game-of-life.service';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-game-of-life',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './game-of-life.component.html',
  styleUrl: './game-of-life.component.scss'
})
export class GameOfLifeComponent {


  constructor(private gameOfLifeService: GameOfLifeService, private el: ElementRef) {}

  // Game of life

  numRows = 30;
  numColumns = 30;
  cells: Cell[] = [];

  running = true;
  speed = 1;
  // interval: any;

  cellSize = 20;

  gameInfoVisible = false;

  // observer!: IntersectionObserver;

  ngOnInit(): void {
    this.cells = this.gameOfLifeService.createEmptyGrid(this.numRows, this.numColumns);
    this.gameOfLifeService.startGame(this.cells, this.numRows, this.numColumns);

    this.adjustCellSize();




    // console.log(this.cells);
    // Initialize Intersection Observer
    // this.observer = new IntersectionObserver((entries) => {
    //   entries.forEach(entry => {
    //     if (entry.intersectionRatio === 0) {
    //       this.gameOfLifeService.stopGame();
    //       console.log('START GAME');

    //     } else {
    //       this.gameOfLifeService.startGame(this.cells, this.numRows, this.numColumns);
    //       console.log('START GAME');
    //     }
    //   });
    // }, { threshold: [0] });

    // this.observer.observe(this.el.nativeElement);

    if (window.innerWidth < 400) {
      this.gameOfLifeService.fillRandomGrid(this.cells, this.numRows, this.numColumns);
    }
  }

  ngOnDestroy(): void {
    this.gameOfLifeService.stopGame();
  }


  // Game of life

  toggleCellState(cell: Cell): void {
    cell.alive = !cell.alive;
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
