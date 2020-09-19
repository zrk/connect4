import { observable, computed, action } from 'mobx';
import { createTransformer } from 'mobx-utils';
import { Coin } from './types';
import { WIN_NUMBER, WIDTH, HEGHT } from './constants';
import { Column } from './Column';
import { elementInARow } from './elementInARow';

export class Matrix {
  @observable private width = 0;

  @observable private height = 0;

  @observable private winNumber = 0;

  @computed
  private get createColumn() {
    return () => new Column({ height: this.height, winNumber: this.winNumber });
  }

  @computed
  get columns(): Column[] {
    return Array.from(Array(this.width), this.createColumn);
  }

  @computed
  private get rowNumbers(): number[] {
    return Array.from(Array(this.width)).map((_, i) => i);
  }

  constructor({ width = WIDTH, height = HEGHT, winNumber = WIN_NUMBER }) {
    this.init(width, height, winNumber);
  }

  @action
  private init(width: number, height: number, winNumber: number) {
    this.width = width;
    this.height = height;
    this.winNumber = winNumber;
  }

  private readonly rowWinner = createTransformer<number, Coin | undefined>(index => {
    const row = this.columns.map(column => column.cells[index]);
    return elementInARow(row, this.winNumber);
  });

  @computed
  private get winnerInRows(): Coin | undefined {
    return this.rowNumbers.map(this.rowWinner).find(Boolean);
  }

  @computed
  private get winnerInColumns(): Coin | undefined {
    return this.columns.map(column => column.winner).find(Boolean);
  }

  @computed
  get winner(): Coin | undefined {
    return this.winnerInColumns || this.winnerInRows;
  }
}
