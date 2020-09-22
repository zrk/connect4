/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';
import { observer } from 'mobx-react-lite';
import { CSSTransition } from 'react-transition-group';
import { Column } from 'src/ConnectGame';
import { CoinView } from './CoinView';
import { SquareDiv } from './SquareDiv';

interface Props {
  column: Column;
  index: number;
}

const coinWidthFactor = 0.86;
const maxDropTimeout = 300;

export const CellView = observer<Props>(({ column, index }) => {
  const cellContent = column.cells[index];
  const offset = ((column.height - index) / coinWidthFactor) * 100;
  const timeout = (maxDropTimeout / column.height) * (column.height - index);

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
      <CSSTransition
        in={cellContent !== undefined}
        timeout={timeout}
        classNames="coin"
        mountOnEnter
      >
        <React.Fragment>
          {cellContent !== undefined && (
            <CoinView
              coin={cellContent}
              css={{
                width: `${coinWidthFactor * 100}%`,
                '&.coin-enter': {
                  transform: `translateY(-${offset}%)`,
                },
                '&.coin-enter-active': {
                  transform: 'none',
                  transition: `transform ${timeout}ms ease-in`,
                },
              }}
            />
          )}
        </React.Fragment>
      </CSSTransition>
    </SquareDiv>
  );
});
