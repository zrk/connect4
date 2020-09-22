/** @jsx jsx */
import { jsx } from '@emotion/core';
import { observer } from 'mobx-react-lite';
import { Gameplay } from 'src/ConnectGame';
import { CoinView } from './CoinView';

interface Props {
  game: Gameplay;
}

const COIN_SIZE = 1;

const Content = (props: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    css={{
      display: 'flex',
      alignItems: 'center',
      textTransform: 'uppercase',
      lineHeight: COIN_SIZE,
    }}
    {...props}
  />
);

const Coin = (props: React.ComponentProps<typeof CoinView>) => (
  <CoinView css={{ width: `${COIN_SIZE}em`, marginLeft: 5 }} {...props} />
);

export const Message = observer<Props>(({ game }) => {
  if (game.isOver) {
    if (game.winner === undefined) return <Content>Draw</Content>;

    return (
      <Content>
        Winner:
        <Coin coin={game.winner} />
      </Content>
    );
  }

  if (game.turn !== undefined) {
    return (
      <Content>
        Turn:
        <Coin coin={game.turn} />
      </Content>
    );
  }

  return null;
});
