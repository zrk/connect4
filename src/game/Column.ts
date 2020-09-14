import { observable, computed, action } from 'mobx';
import { createTransformer } from 'mobx-utils';
import { Coin, Cell } from './types';
import { elementInARow } from './elementInARow';

interface Interface {
  readonly isFull: boolean;
  readonly winner?: Coin;
  cell(index: number): Cell;
  insert(coin: Coin): boolean;
}

export class Column implements Interface {
  private readonly height: number;

  private readonly winNumber: number;

  @observable private arr: Coin[] = [];

  constructor({ height = 1, winNumber = 1 }) {
    this.height = height;
    this.winNumber = winNumber;
  }

  @computed
  get isFull(): boolean {
    return this.arr.length >= this.height;
  }

  readonly cell = createTransformer<number, Cell>(index =>
    (index >= this.arr.length ? undefined : this.arr[index]),
  );

  @action
  insert(coin: Coin): boolean {
    if (this.isFull) return false;

    this.arr.push(coin);
    return true;
  }

  @computed
  get winner(): Coin | undefined {
    return elementInARow(this.arr, this.winNumber);
  }
}
