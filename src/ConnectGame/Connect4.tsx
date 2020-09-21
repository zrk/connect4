import React from 'react';
import { observer } from 'mobx-react-lite';
import { Board } from './Board';
import { Gameplay } from './Gameplay';
import { Game } from './View';

const WIDTH = 7;
const HEIGHT = 6;
const WIN_NUMBER = 4;

type Props = Partial<React.ComponentProps<typeof Game>>;

export const Connect4 = observer<Props>(
  ({
    board = new Board(WIDTH, HEIGHT),
    game = new Gameplay(board, WIN_NUMBER),
    ...props
  }) => <Game board={board} game={game} {...props} />,
);
