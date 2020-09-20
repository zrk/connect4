export enum Coin {
  Yellow,
  Red,
}

export type Player = Coin;

export type CellContent = Coin | undefined;

export interface CellsObject {
  readonly cellKeys: number[];
  readonly cells: { readonly [key: number]: CellContent };
}

export interface Column extends CellsObject{
  readonly isFull: boolean;
  insert(coin: Coin): boolean;
}

export type Row = CellsObject;

export interface Board {
  readonly columns: Column[];
  readonly rows: Row[];
  init(width?: number, height?: number): void;
}

export interface Gameplay {
  readonly isOver: boolean;
  readonly winner: Player | undefined;
  readonly turn: Player | undefined;

  init(field?: Board, winNumber?: number): void;
  makeMove(columnKey: number): boolean;
}
