/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/core';
import { observer } from 'mobx-react-lite';
import { SquareDiv } from './SquareDiv';

type Props = React.ComponentProps<typeof SquareDiv>;

export const Slot = observer<Props>(props => (
  <SquareDiv
    css={{
      background: 'radial-gradient(transparent 52%, RoyalBlue 55%)',
    }}
    {...props}
  />
));
