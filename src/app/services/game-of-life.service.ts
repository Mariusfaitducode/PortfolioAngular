import { Injectable } from '@angular/core';

export class Cell{
  alive : boolean = false
  neighbors : number = 0
}


@Injectable({
  providedIn: 'root'
})
export class GameOfLifeService {

  private interval: any;

  createEmptyGrid(rows: number, columns: number): Cell[] {
    return  Array.from({ length: rows * columns }, () => new Cell());
  }

  fillRandomGrid(cells: Cell[], rows: number, columns: number): void {
    for (let index = 0; index < cells.length; index++) {
      cells[index].alive = Math.random() < 0.5;
    }
  }

  startGame(cells: Cell[], rows: number, columns: number): void {
    this.interval = setInterval(() => this.updateGrid(cells, rows, columns), 1000);
  }

  stopGame(): void {
    clearInterval(this.interval);
  }

  updateInterval(cells: Cell[], rows: number, columns: number, speed: number): void {
    clearInterval(this.interval);
    this.interval = setInterval(() => this.updateGrid(cells, rows, columns), 1000 / speed);
  }

  // toggleCellState(cell: Cell): void {

  //   cell.alive = !cell.alive;

  //   // return cells;
  // }

  updateGrid(cells: Cell[], rows: number, columns: number): void {

    // console.log("UPDATE GRID")

    // console.log(cells)

    const transitionGrid =  Array.from({ length: rows * columns }, () => new Cell());

    for (let index = 0; index < cells.length; index++) {
      
      const isAlive = cells[index].alive;
      const neighbors = this.countAliveNeighbors(cells, index, rows, columns);

      // console.log(isAlive)

      transitionGrid[index].neighbors = neighbors;

      if (neighbors === 3 || (neighbors === 2 && isAlive)) {
        transitionGrid[index].alive = true;
      } else {
        transitionGrid[index].alive = false;
      }
    }

    for (let index = 0; index < cells.length; index++) {
      cells[index] = transitionGrid[index];
    }

    for (let index = 0; index < cells.length; index++) {
      cells[index].neighbors = this.countAliveNeighbors(cells, index, rows, columns);
    }

    // console.log(cells)
  }


  private countAliveNeighbors(cells: Cell[], index: number, rows: number, columns: number): number {
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

          if (cells[neighborIndex].alive) count++;
        }
      }
    }

    // console.log(count);

    return count;
  }

  
}
