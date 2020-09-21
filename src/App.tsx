/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';
import { configure } from 'mobx';
import { Connect4 } from './ConnectGame';

configure({
  enforceActions: 'always',
  computedRequiresReaction: true,
});

export const App: React.FC = () => (
  <div
    css={{
      textAlign: 'center',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <Connect4 css={{ width: 340 }} />
  </div>
);
