import { observable, computed, action } from 'mobx';
import { createTransformer } from 'mobx-utils';
import { Player } from 'src/ConnectGame';
import { Column } from './Column';
import { elementInARow } from './elementInARow';

export class Matrix {
  @observable private width = 0;

  @observable private height = 0;

  @observable private winNumber = 0;

  @computed
  private get createColumn() {
    return () => new Column(this.height, this.winNumber);
  }

  @computed
  get columns(): Column[] {
    return Array.from(Array(this.width), this.createColumn);
  }

  @computed
  private get rowNumbers(): number[] {
    return Array.from(Array(this.width)).map((_, i) => i);
  }

  constructor(width: number, height: number, winNumber: number) {
    this.init(width, height, winNumber);
  }

  @action
  private init(width: number, height: number, winNumber: number) {
    this.width = width;
    this.height = height;
    this.winNumber = winNumber;
  }

  private readonly rowWinner = createTransformer<number, Player | undefined>(index => {
    const row = this.columns.map(column => column.cells[index]);
    return elementInARow(row, this.winNumber);
  });

  @computed
  private get winnerInRows(): Player | undefined {
    return this.rowNumbers.map(this.rowWinner).find(Boolean);
  }

  @computed
  private get winnerInColumns(): Player | undefined {
    return this.columns.map(column => column.winner).find(Boolean);
  }

  @computed
  get winner(): Player | undefined {
    return this.winnerInColumns || this.winnerInRows;
  }
}
