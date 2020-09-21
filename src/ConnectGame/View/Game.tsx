/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';
import { observer } from 'mobx-react-lite';
import { Board, Gameplay } from 'src/ConnectGame';
import { BoardView } from './BoardView';
import { Message } from './Message';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  board: Board;
  game: Gameplay;
}

export const Game = observer<Props>(({ board, game, ...props }) => {
  const init = React.useCallback(() => {
    game.init();
    board.init();
  }, [game, board]);

  return (
    <div css={{ '& > *': { margin: 10 } }} {...props}>
      <Message game={game} />
      <BoardView
        board={board}
        isGameOver={game.isOver}
        onColumnClick={game.makeMove}
      />
      <button type="button" onClick={init}>
        Start New Game
      </button>
    </div>
  );
});
