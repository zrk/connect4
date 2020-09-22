/** @jsx jsx */
import { jsx } from '@emotion/core';
import { observer } from 'mobx-react-lite';
import { Column } from 'src/ConnectGame';
import { CoinView, SquareDiv } from './components';

interface Props {
  column: Column;
  index: number;
}

export const CellView = observer<Props>(({ column, index }) => {
  const cellContent = column.cells[index];

  return (
    <SquareDiv>
      <div
        css={{
          zIndex: 1,
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          background: 'radial-gradient(transparent 52%, RoyalBlue 55%)',
        }}
      />
      {cellContent !== undefined && (
        <CoinView coin={cellContent} css={{ width: '90%' }} />
      )}
    </SquareDiv>
  );
});
