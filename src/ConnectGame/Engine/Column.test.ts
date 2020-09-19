import { autorun } from 'mobx';
import { Coin } from 'src/ConnectGame';
import { Column } from './Column';

describe('Column', () => {
  it('returns true on successful insert, false on unsuccessful', () => {
    const column = new Column(1);
    expect(column.insert(Coin.Red)).toBe(true);
    expect(column.insert(Coin.Red)).toBe(false);
  });

  it('accesses cells in reactive manner', () => {
    const column = new Column(8);

    let firstCellShouldBecome: Coin | undefined;

    const firstCellCheck = jest.fn(() =>
      expect(column.cells[0]).toBe(firstCellShouldBecome),
    );

    const secondCellCheck = jest.fn(() =>
      expect(column.cells[1]).toBe(firstCellShouldBecome),
    );

    firstCellShouldBecome = undefined;
    const disposer = autorun(firstCellCheck);
    const disposer1 = autorun(secondCellCheck);

    expect(firstCellCheck.mock.calls.length).toBe(1);
    expect(secondCellCheck.mock.calls.length).toBe(1);

    firstCellShouldBecome = Coin.Red;
    column.insert(Coin.Red);
    expect(firstCellCheck.mock.calls.length).toBe(2);
    expect(secondCellCheck.mock.calls.length).toBe(1);

    column.insert(Coin.Red);
    expect(firstCellCheck.mock.calls.length).toBe(2);
    expect(secondCellCheck.mock.calls.length).toBe(2);

    disposer();
    disposer1();
  });

  it('shows when it is full of coins, reactive', () => {
    const column = new Column(2);
    let isFull = true;

    const checkIsFull = jest.fn(() => {
      isFull = column.isFull;
    });

    const disposer = autorun(checkIsFull);

    expect(isFull).toBeFalsy();
    expect(checkIsFull.mock.calls.length).toBe(1);

    column.insert(Coin.Red);
    expect(isFull).toBeFalsy();
    expect(checkIsFull.mock.calls.length).toBe(1);

    column.insert(Coin.Yellow);
    expect(isFull).toBeTruthy();
    expect(checkIsFull.mock.calls.length).toBe(2);

    column.insert(Coin.Red);
    expect(isFull).toBeTruthy();
    expect(checkIsFull.mock.calls.length).toBe(2);

    disposer();
  });

  it('computes winner, reactive', () => {
    const column = new Column(8, 3);

    let winner: Coin | undefined = Coin.Yellow;

    const checkWinner = jest.fn(() => {
      winner = column.winner;
    });

    const disposer = autorun(checkWinner);

    expect(winner).toBeFalsy();
    expect(checkWinner.mock.calls.length).toBe(1);

    column.insert(Coin.Yellow);
    expect(winner).toBeFalsy();
    expect(checkWinner.mock.calls.length).toBe(1);

    column.insert(Coin.Red);
    expect(winner).toBeFalsy();
    expect(checkWinner.mock.calls.length).toBe(1);

    column.insert(Coin.Red);
    expect(winner).toBeFalsy();
    expect(checkWinner.mock.calls.length).toBe(1);

    column.insert(Coin.Red);
    expect(winner).toBe(Coin.Red);
    expect(checkWinner.mock.calls.length).toBe(2);

    disposer();
  });
});
