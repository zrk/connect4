/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/core';

type Props =
  JSX.IntrinsicAttributes &
  React.ClassAttributes<HTMLDivElement> &
  React.HTMLAttributes<HTMLDivElement>;

export const SquareDiv: React.FC<Props> = ({ children, ...props }) => (
  <div
    css={{
      position: 'relative',
      width: '100%',
      height: 0,
      paddingTop: '100%',
    }}
    {...props}
  >
    <div
      css={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      }}
    >
      {children}
    </div>
  </div>
);
