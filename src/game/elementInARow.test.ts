import { elementInARow } from './elementInARow';
import { Coin } from './types';

describe('elementInARow()', () => {
  it('returns array element that is present N times in a row', () => {
    const array = [1, 2, 2, 2, 3, 4];
    expect(elementInARow(array, 3)).toBe(2);
  });

  it('ignores undefined, null, NaN elements', () => {
    expect(elementInARow([1, undefined, undefined, undefined, 2, 2, 2, 3, 4], 3))
      .toBe(2);

    expect(elementInARow([1, null, null, null, 2, 2, 2, 3, 4], 3))
      .toBe(2);

    expect(elementInARow([1, NaN, NaN, NaN, 2, 2, 2, 3, 4], 3))
      .toBe(2);
  });

  it('does not ignore zeros or empty strings', () => {
    expect(elementInARow([1, '', '', '', 2, 2, 2, 3, 4], 3))
      .toBe('');

    expect(elementInARow([1, 0, 0, 0, 2, 2, 2, 3, 4], 3))
      .toBe(0);
  });

  it('returns undefined if no array element is present N times in a row', () => {
    expect(elementInARow([1, 2, 2, 2, 3, 4], 4))
      .toBe(undefined);
  });

  it('works with Coins', () => {
    const array = [
      Coin.Yellow,
      Coin.Red,
      Coin.Red,
      Coin.Red,
      Coin.Red,
      Coin.Yellow,
    ];
    expect(elementInARow(array, 4)).toBe(Coin.Red);
  });

  it('works with incorrect params the way we might expect', () => {
    const array = ['first element', 2, 2, 2, 3, 4];
    expect(elementInARow(array, 1)).toBe('first element');
    expect(elementInARow(array, 0)).toBe('first element');
    expect(elementInARow(array, -1)).toBe('first element');

    expect(elementInARow([], 3)).toBe(undefined);
    expect(elementInARow([], 0)).toBe(undefined);
    expect(elementInARow([], -3)).toBe(undefined);
  });
});
