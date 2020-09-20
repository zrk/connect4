import { autorun } from 'mobx';
import {
  CellContent,
  Coin,
  Player,
  Column,
} from 'src/ConnectGame';
import { Gameplay } from './Gameplay';

describe('Gameplay', () => {
  describe('Finding the winner in column', () => {
    const boardStub = {
      rows: [],
      init() {
      },
    };

    const makeBoard = (cells: CellContent[], isFull = false) => ({
      ...boardStub,
      columns: [
        {
          cellKeys: [0, 1, 2, 3],
          cells,
          isFull,
          insert: () => true,
        },
      ],
    });

    it('finds no winner in empty column', () => {
      const board = makeBoard([undefined, undefined, undefined, undefined]);
      const game = new Gameplay(board, 2);
      autorun(() => expect(game.winner).toBe(undefined))();
    });

    it('negative when no winner', () => {
      const board = makeBoard([Coin.Yellow, Coin.Red, Coin.Yellow, undefined]);
      const game = new Gameplay(board, 2);
      autorun(() => expect(game.winner).toBe(undefined))();
    });

    it('finds a Yellow winner in non full column', () => {
      const board = makeBoard([Coin.Red, Coin.Yellow, Coin.Yellow, undefined]);
      const game = new Gameplay(board, 2);
      autorun(() => expect(game.winner).toBe(Coin.Yellow))();
    });

    it('finds a Red winner in non full column', () => {
      const board = makeBoard([Coin.Red, Coin.Red, Coin.Yellow, undefined]);
      const game = new Gameplay(board, 2);
      autorun(() => expect(game.winner).toBe(Coin.Red))();
    });

    it('finds a winner in full column', () => {
      const board = makeBoard([Coin.Yellow, Coin.Red, Coin.Yellow, Coin.Yellow], true);
      const game = new Gameplay(board, 2);
      autorun(() => expect(game.winner).toBe(Coin.Yellow))();
    });
  });

  describe('Finding the winner in row', () => {
    const boardStub = {
      columns: [],
      init() {
      },
    };

    const makeBoard = (cells: CellContent[]) => ({
      ...boardStub,
      rows: [
        {
          cellKeys: [0, 1, 2, 3],
          cells,
        },
      ],
    });

    it('finds no winner in empty row', () => {
      const board = makeBoard([undefined, undefined, undefined, undefined]);
      const game = new Gameplay(board, 2);
      autorun(() => expect(game.winner).toBe(undefined))();
    });

    it('negative when no winner', () => {
      const board = makeBoard([Coin.Yellow, Coin.Red, Coin.Yellow, undefined]);
      const game = new Gameplay(board, 2);
      autorun(() => expect(game.winner).toBe(undefined))();
    });

    it('finds a Yellow winner in non full row', () => {
      const board = makeBoard([Coin.Red, Coin.Yellow, Coin.Yellow, undefined]);
      const game = new Gameplay(board, 2);
      autorun(() => expect(game.winner).toBe(Coin.Yellow))();
    });

    it('finds a Red winner in non full row', () => {
      const board = makeBoard([Coin.Red, Coin.Red, Coin.Yellow, undefined]);
      const game = new Gameplay(board, 2);
      autorun(() => expect(game.winner).toBe(Coin.Red))();
    });

    it('finds a winner in full row', () => {
      const board = makeBoard([Coin.Yellow, Coin.Red, Coin.Yellow, Coin.Yellow]);
      const game = new Gameplay(board, 2);
      autorun(() => expect(game.winner).toBe(Coin.Yellow))();
    });
  });

  describe('Checking end of game', () => {
    const emptyColumnStub = {
      cellKeys: [0, 1, 2],
      cells: [undefined, undefined, undefined],
      isFull: false,
      insert: () => true,
    };

    const fullColumnStub = {
      ...emptyColumnStub,
      isFull: true,
    };

    const winColumnStub = {
      ...emptyColumnStub,
      cells: [Coin.Red, Coin.Yellow, Coin.Yellow],
    };

    const randomColumnStub = {
      ...emptyColumnStub,
      cells: [Coin.Yellow, Coin.Red, undefined],
    };

    it('ends game when the board is full', () => {
      const board = {
        rows: [],
        columns: [fullColumnStub, fullColumnStub, fullColumnStub],
        init() {},
      };

      const game = new Gameplay(board, 100);
      autorun(() => expect(game.isOver).toBeTruthy())();
    });

    it('ends game when there is a winner', () => {
      const board = {
        rows: [],
        columns: [winColumnStub, emptyColumnStub, emptyColumnStub],
        init() {},
      };

      const game = new Gameplay(board, 2);
      autorun(() => expect(game.isOver).toBeTruthy())();
    });

    it('does not end game when there is no winner and the board is not full', () => {
      const board = {
        rows: [],
        columns: [randomColumnStub, fullColumnStub, emptyColumnStub],
        init() {},
      };

      const game = new Gameplay(board, 2);
      autorun(() => expect(game.isOver).toBeFalsy())();
    });
  });

  describe('Making moves', () => {
    const makeColumn = (
      insert = () => true,
      cells: CellContent[] = [undefined, undefined, undefined],
    ): Column => ({
      cellKeys: [0, 1, 2],
      cells,
      isFull: false,
      insert,
    });

    const makeBoard = (insert?: () => boolean, cells?: CellContent[]) => ({
      rows: [],
      columns: [
        makeColumn(insert, cells),
        makeColumn(insert),
        makeColumn(insert),
      ],
      init() {},
    });

    it('sets first turn player on init', () => {
      const game = new Gameplay(makeBoard(), 100);
      autorun(() => {
        expect(game.turn).not.toBe(undefined);
      })();
    });

    it('switches players on move', () => {
      const game = new Gameplay(makeBoard(), 100);

      let currentTurn: Player | undefined;
      autorun(() => { currentTurn = game.turn; })();

      game.makeMove(0);
      autorun(() => expect(game.turn).not.toBe(currentTurn))();
    });

    it('actually makes moves', () => {
      const mockInsert = jest.fn(() => true);

      const game = new Gameplay(makeBoard(mockInsert), 100);
      expect(mockInsert.mock.calls.length).toBe(0);

      game.makeMove(0);
      expect(mockInsert.mock.calls.length).toBe(1);

      game.makeMove(1);
      expect(mockInsert.mock.calls.length).toBe(2);
    });

    it('does not insert coins when the game is over', () => {
      const mockInsert = jest.fn(() => true);
      const board = makeBoard(
        mockInsert,
        [Coin.Yellow, Coin.Yellow, undefined],
      );
      const game = new Gameplay(board, 2);

      game.makeMove(0);
      expect(mockInsert.mock.calls.length).toBe(0);
    });
  });
});
