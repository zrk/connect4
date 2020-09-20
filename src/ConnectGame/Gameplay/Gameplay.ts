import { observable, computed, action } from 'mobx';
import { createTransformer } from 'mobx-utils';
import {
  Row,
  Player,
  Column,
  Board,
  Gameplay as Interface, Coin,
} from 'src/ConnectGame';
import { elementInARow } from './elementInARow';

const FIRST_TURN = Coin.Yellow;

function isCoin(value: Coin | undefined) {
  return (value !== undefined) && (value in Coin);
}

export class Gameplay implements Interface {
  @observable private winNumber = 0;

  @observable private board?: Board;

  @observable private currentPlayer: Player = FIRST_TURN;

  constructor(board: Board, winNumber: number) {
    this.init(board, winNumber);
  }

  @action.bound
  init(
    board = this.board,
    winNumber = this.winNumber,
    firstTurn = this.currentPlayer,
  ): void {
    this.board = board;
    this.winNumber = winNumber;
    this.currentPlayer = firstTurn;
  }

  @action.bound
  private switchPlayer(): void {
    this.currentPlayer += 1;
    if (!(this.currentPlayer in Coin)) this.currentPlayer = 0;
  }

  @computed
  get columns(): Column[] {
    return this.board?.columns ?? [];
  }

  private readonly cellsObjectWinner = createTransformer<Row | Column, Player | undefined>(
    cellsObject => {
      const arr = cellsObject.cellKeys.map(key => cellsObject.cells[key]);
      return elementInARow(arr, this.winNumber);
    },
  );

  @computed
  private get winnerInRows(): Player | undefined {
    return this.board?.rows?.map(this.cellsObjectWinner).find(isCoin);
  }

  @computed
  private get winnerInColumns(): Player | undefined {
    return this.board?.columns?.map(this.cellsObjectWinner).find(isCoin);
  }

  @computed
  get winner(): Player | undefined {
    return this.winnerInColumns ?? this.winnerInRows;
  }

  @computed
  get isFull(): boolean {
    return this.columns.every(column => column.isFull);
  }

  @computed
  get isOver(): boolean {
    return isCoin(this.winner) || this.isFull;
  }

  @computed
  get turn(): Player | undefined {
    if (this.isOver) return undefined;

    return this.currentPlayer;
  }

  @action.bound
  makeMove(columnKey: number): boolean {
    if (this.isOver) return false;

    const isSuccess = this.board?.columns[columnKey].insert(this.currentPlayer);
    if (isSuccess) {
      this.switchPlayer();
    }

    return Boolean(isSuccess);
  }
}
