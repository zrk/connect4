import { autorun } from 'mobx';
import { Coin } from 'src/ConnectGame';
import { Matrix } from './Matrix';

describe('Matrix', () => {
  describe('Finding the winner', () => {
    let matrix: Matrix;
    let winner: Coin | undefined;

    const saveWinner = () => { winner = matrix.winner; };

    let checkWinner: jest.Mock<void>;
    let disposer = () => {};

    beforeEach(() => {
      matrix = new Matrix(4, 8, 3);
      winner = Coin.Yellow;
      checkWinner = jest.fn(saveWinner);
      disposer = autorun(checkWinner);
    });

    afterEach(disposer);

    it('finds winner in row, reactive', () => {
      expect(winner).toBeFalsy();
      expect(checkWinner.mock.calls.length).toBe(1);

      matrix.columns[0].insert(Coin.Yellow);
      expect(winner).toBeFalsy();
      expect(checkWinner.mock.calls.length).toBe(1);

      matrix.columns[1].insert(Coin.Red);
      expect(winner).toBeFalsy();
      expect(checkWinner.mock.calls.length).toBe(1);

      matrix.columns[2].insert(Coin.Red);
      expect(winner).toBeFalsy();
      expect(checkWinner.mock.calls.length).toBe(1);

      matrix.columns[3].insert(Coin.Red);
      expect(winner).toBe(Coin.Red);
      expect(checkWinner.mock.calls.length).toBe(2);
    });

    it('finds winner in column, reactive', () => {
      expect(winner).toBeFalsy();
      expect(checkWinner.mock.calls.length).toBe(1);

      matrix.columns[0].insert(Coin.Yellow);
      expect(winner).toBeFalsy();
      expect(checkWinner.mock.calls.length).toBe(1);

      matrix.columns[0].insert(Coin.Red);
      expect(winner).toBeFalsy();
      expect(checkWinner.mock.calls.length).toBe(1);

      matrix.columns[0].insert(Coin.Red);
      expect(winner).toBeFalsy();
      expect(checkWinner.mock.calls.length).toBe(1);

      matrix.columns[0].insert(Coin.Red);
      expect(winner).toBe(Coin.Red);
      expect(checkWinner.mock.calls.length).toBe(2);
    });
  });
});
