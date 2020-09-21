/** @jsx jsx */
import { jsx } from '@emotion/core';
import { observer } from 'mobx-react-lite';
import { Gameplay } from 'src/ConnectGame';

interface Props {
  game: Gameplay;
}

export const Message = observer<Props>(({ game }) => (
  <div>
    <div>
      Turn:
      {game.turn}
    </div>
    <div>
      Winner:
      {game.winner}
    </div>
    <div>
      isOver:
      {game.isOver ? 'yes' : 'no'}
    </div>
  </div>
));
