import { autorun } from 'mobx';
import { CellContent, Coin } from 'src/ConnectGame';
import { Board } from './Board';

describe('Board', () => {
  it('has number of columns equal to width', () => {
    const m = new Board(3, 1);
    expect(m.columns.length).toBe(3);
  });

  it('has number of computed rows equal to height', () => {
    const m = new Board(1, 3);
    autorun(() => {
      expect(m.rows.length).toBe(3);
    })();
  });

  it('inserts into specified column', () => {
    const m = new Board(2, 2);

    m.columns[1].insert(Coin.Red);
    m.columns[1].insert(Coin.Red);
    autorun(() => {
      expect(m.columns[1].cells[1]).toBe(Coin.Red);
    })();
  });

  it('cleans up on init()', () => {
    const m = new Board(2, 2);

    m.columns[1].insert(Coin.Red);
    m.columns[1].insert(Coin.Red);

    m.init();
    autorun(() => {
      expect(m.columns[1].cells[1]).toBeFalsy();
    })();
  });

  it('forms rows out of columns, reactive', () => {
    const m = new Board(3, 1);

    const whatRowShouldBecome: CellContent[] = [];

    const checkCell0 = jest.fn(() =>
      expect(m.rows[0].cells[0]).toBe(whatRowShouldBecome[0]),
    );

    const checkCell1 = jest.fn(() =>
      expect(m.rows[0].cells[1]).toBe(whatRowShouldBecome[1]),
    );

    const checkCell2 = jest.fn(() =>
      expect(m.rows[0].cells[2]).toBe(whatRowShouldBecome[2]),
    );

    const disposer0 = autorun(checkCell0);
    const disposer1 = autorun(checkCell1);
    const disposer2 = autorun(checkCell2);
    expect(checkCell0.mock.calls.length).toBe(1);
    expect(checkCell1.mock.calls.length).toBe(1);
    expect(checkCell2.mock.calls.length).toBe(1);

    whatRowShouldBecome[0] = Coin.Red;
    m.columns[0].insert(Coin.Red);
    expect(checkCell0.mock.calls.length).toBe(2);
    expect(checkCell1.mock.calls.length).toBe(1);
    expect(checkCell2.mock.calls.length).toBe(1);

    whatRowShouldBecome[1] = Coin.Yellow;
    m.columns[1].insert(Coin.Yellow);
    expect(checkCell0.mock.calls.length).toBe(2);
    expect(checkCell1.mock.calls.length).toBe(2);
    expect(checkCell2.mock.calls.length).toBe(1);

    disposer0();
    disposer1();
    disposer2();
  });
});
