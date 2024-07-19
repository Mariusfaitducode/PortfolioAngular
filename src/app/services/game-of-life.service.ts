import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameOfLifeService {

  private interval: any;

  createEmptyGrid(rows: number, columns: number): boolean[] {
    return new Array(rows * columns).fill(false);
  }

  startGame(cells: boolean[], rows: number, columns: number): void {
    this.interval = setInterval(() => this.updateGrid(cells, rows, columns), 1000);
  }

  stopGame(): void {
    clearInterval(this.interval);
  }

  updateInterval(cells: boolean[], rows: number, columns: number, speed: number): void {
    clearInterval(this.interval);
    this.interval = setInterval(() => this.updateGrid(cells, rows, columns), 1000 / speed);
  }

  toggleCellState(cells: boolean[], index: number): void {
    cells[index] = !cells[index];
  }

  updateGrid(cells: boolean[], rows: number, columns: number): void {
    const transitionGrid = new Array(rows * columns).fill(false);

    for (let index = 0; index < cells.length; index++) {
      const isAlive = cells[index];
      const neighbors = this.countAliveNeighbors(cells, index, rows, columns);

      if (neighbors === 3 || (neighbors === 2 && isAlive)) {
        transitionGrid[index] = true;
      } else {
        transitionGrid[index] = false;
      }
    }

    for (let index = 0; index < cells.length; index++) {
      cells[index] = transitionGrid[index];
    }
  }

  private countAliveNeighbors(cells: boolean[], index: number, rows: number, columns: number): number {
    const row = Math.floor(index / columns);
    const col = index % columns;
    let count = 0;

    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i === 0 && j === 0) continue;
        const neighborRow = row + i;
        const neighborCol = col + j;
        if (neighborRow >= 0 && neighborRow < rows && neighborCol >= 0 && neighborCol < columns) {
          const neighborIndex = neighborRow * columns + neighborCol;
          if (cells[neighborIndex]) count++;
        }
      }
    }

    return count;
  }

  
}
