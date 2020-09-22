/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';
import { observer } from 'mobx-react-lite';
import { Board } from 'src/ConnectGame';
import { ColumnView } from './ColumnView';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  board: Board;
  isGameOver?: boolean;
  onColumnClick?(i: number): void;
}

export const BoardView = observer<Props>(
  ({
    board,
    isGameOver,
    onColumnClick,
    ...props
  }) => {
    const handleColumnClick = React.useCallback(
      (i: number) => () => onColumnClick && onColumnClick(i),
      [onColumnClick],
    );

    return (
      <div css={{ display: 'flex' }} {...props}>
        {board.columns.map((column, i) => (
          <ColumnView
            // eslint-disable-next-line react/no-array-index-key
            key={i}
            column={column}
            onClick={handleColumnClick(i)}
            css={{
              flex: '1',
              cursor: isGameOver ? 'unset' : undefined,
              ':hover': !isGameOver ? { opacity: 0.7 } : undefined,
            }}
          />
        ))}
      </div>
    );
  },
);
