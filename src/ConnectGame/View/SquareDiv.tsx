/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/core';

type Props = React.HTMLAttributes<HTMLDivElement>;

export const SquareDiv: React.FC<Props> = ({ children, ...props }) => (
  <div
    css={{
      position: 'relative',
      '&::before': {
        content: '""',
        display: 'block',
        paddingTop: '100%',
      },
    }}
    {...props}
  >
    {children && (
      <div
        css={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {children}
      </div>
    )}
  </div>
);
