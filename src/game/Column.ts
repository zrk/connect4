import { observable, computed, action } from 'mobx';
import { Coin, Cell } from './types';
import { elementInARow } from './elementInARow';

export class Column {
  private readonly height: number;

  private readonly winNumber: number;

  @observable private topEmptyCellIndex = 0;

  @observable readonly cells: { [key: number]: Cell } = {};

  constructor({ height = 1, winNumber = 1 }) {
    this.height = height;
    this.winNumber = winNumber;
  }

  @computed
  get cellNumbers(): number[] {
    return Array.from(Array(this.height), (_, i) => i);
  }

  @computed
  get isFull(): boolean {
    return this.topEmptyCellIndex >= this.height;
  }

  @action
  insert(coin: Coin): boolean {
    if (this.isFull) return false;

    this.cells[this.topEmptyCellIndex] = coin;
    this.topEmptyCellIndex += 1;

    return true;
  }

  @computed
  get winner(): Coin | undefined {
    return elementInARow(
      this.cellNumbers.map(i => this.cells[i]),
      this.winNumber,
    );
  }
}
