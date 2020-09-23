/** @jsx jsx */
import { jsx } from '@emotion/core';
import { ThemeProvider } from 'emotion-theming';
import React from 'react';
import { configure } from 'mobx';
import { Connect4 } from './ConnectGame';

configure({
  enforceActions: 'always',
  computedRequiresReaction: true,
});

const theme = {
  colors: {
    blue: '#00A6ED',
    red: '#A41621',
    yellow: '#F7CB15',
  },
};

export const App: React.FC = () => (
  <ThemeProvider<typeof theme> theme={theme}>
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
  </ThemeProvider>
);
