import { observable, computed, action } from 'mobx';
import { createTransformer } from 'mobx-utils';
import { Row, Board as Interface } from 'src/ConnectGame';
import { Column } from './Column';

export class Board implements Interface {
  @observable private width = 0;

  @observable private height = 0;

  @observable columns: Column[] = [];

  constructor(width: number, height: number) {
    this.init(width, height);
  }

  @action.bound
  init(width = this.width, height = this.height): void {
    this.width = width;
    this.height = height;
    this.columns = Array.from(Array(width), () => new Column(height));
  }

  private readonly rowMaker = createTransformer<number, Row>(rowNumber => {
    const cellKeys = Array.from(Array(this.width).keys());

    const cells = {};
    this.columns.forEach((column, i) => {
      Object.defineProperty(cells, i, {
        get() {
          return column.cells[rowNumber];
        },
      });
    });

    return observable({
      cellKeys,
      cells,
    });
  });

  @computed
  private get rowKeys(): number[] {
    return this.columns[0]?.cellKeys ?? [];
  }

  @computed
  get rows(): Row[] {
    return this.rowKeys.map(this.rowMaker);
  }
}
