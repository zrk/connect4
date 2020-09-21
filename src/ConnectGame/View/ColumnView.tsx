/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';
import { observer } from 'mobx-react-lite';
import { Column } from 'src/ConnectGame';
import { CellView } from './CellView';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  column: Column;
}

export const ColumnView = observer<Props>(({ column, ...props }) => (
  <div
    css={{
      cursor: column.isFull ? 'not-allowed' : 'pointer',
      display: 'flex',
      flexFlow: 'column-reverse nowrap',
    }}
    {...props}
  >
    {column.cellKeys.map(i => (
      <CellView key={i} column={column} index={i} />
    ))}
  </div>
));
