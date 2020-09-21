/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/core';
import { observer } from 'mobx-react-lite';
import { Coin } from 'src/ConnectGame';
import { SquareDiv } from './SquareDiv';

interface Props extends React.ComponentProps<typeof SquareDiv> {
  coin: Coin;
}

const colorsMap = new Map([
  [undefined, undefined],
  [Coin.Red, 'red'],
  [Coin.Yellow, 'yellow'],
]);

export const CoinView = observer<Props>(({ coin, ...props }) => (
  <SquareDiv
    css={{
      background: `radial-gradient(${colorsMap.get(coin)} 64%, transparent 68%)`,
    }}
    {...props}
  />
));
