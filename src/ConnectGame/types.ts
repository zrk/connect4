export enum Coin {
  Yellow,
  Red,
}

export type Player = Coin;

export type CellContent = Coin | undefined;

export interface Column {
  readonly cellKeys: number[];
  readonly cells: { [key: number]: CellContent };
  readonly isFull: boolean;

  insert(coin: Coin): boolean;
}

export interface Game {
  readonly isEnded: boolean;
  readonly winner?: Player;
  readonly turn?: Player;
  readonly columns: Column[];

  init(width: number, height: number, winNumber: number): void;
}
