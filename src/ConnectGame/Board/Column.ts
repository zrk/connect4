import { observable, computed, action } from 'mobx';
import { Coin, CellContent, Column as Interface } from 'src/ConnectGame';

export class Column implements Interface {
  @observable private topEmptyCellIndex = 0;

  @observable readonly cells: { [key: number]: CellContent } = {};

  constructor(
    private readonly height = 1,
  ) {}

  @computed
  get cellKeys(): number[] {
    return Array.from(Array(this.height).keys());
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
}
