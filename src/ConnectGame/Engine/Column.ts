import { observable, computed, action } from 'mobx';
import { Coin, CellContent, Column as Interface } from 'src/ConnectGame';
import { elementInARow } from './elementInARow';

export class Column implements Interface {
  @observable private topEmptyCellIndex = 0;

  @observable readonly cells: { [key: number]: CellContent } = {};

  constructor(
    private readonly height = 1,
    private readonly winNumber = 1,
  ) {}

  @computed
  get cellKeys(): number[] {
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
      this.cellKeys.map(i => this.cells[i]),
      this.winNumber,
    );
  }
}
