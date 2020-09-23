/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useTheme } from 'emotion-theming';
import React from 'react';
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

export const CoinView = observer<Props>(({ coin, ...props }) => {
  const { colors } = useTheme();
  const colorName = colorsMap.get(coin);
  const color = colorName && colors[colorName];

  return (
    <SquareDiv
      css={{
        boxSizing: 'border-box',
        background: color,
        borderRadius: '50%',
      }}
      {...props}
    />
  );
});
