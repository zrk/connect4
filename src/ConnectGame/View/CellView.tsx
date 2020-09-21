/** @jsx jsx */
import { jsx } from '@emotion/core';
import { observer } from 'mobx-react-lite';
import { Column } from 'src/ConnectGame';
import { CoinView, Slot } from './components';

interface Props {
  column: Column;
  index: number;
}

export const CellView = observer<Props>(({ column, index }) => {
  const cellContent = column.cells[index];

  return (
    <div css={{ position: 'relative' }}>
      <Slot css={{ zIndex: 1 }} />
      {cellContent !== undefined && (
        <CoinView
          coin={cellContent}
          css={{
            position: 'absolute',
            top: 0,
          }}
        />
      )}
    </div>
  );
});
