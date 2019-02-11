import { CardView as view } from './Card.view';
import { CardStyles as styles, CardTokens as tokens } from './Card.styles';
import { ICardProps } from './Card.types';
import { CardItem } from './CardItem/CardItem';
import { ICardItemProps } from './CardItem/CardItem.types';
import { createComponent } from '../../Foundation';

const CardStatics = {
  Item: CardItem
};

export const Card: React.StatelessComponent<ICardProps> & {
  Item: React.StatelessComponent<ICardItemProps>;
} = createComponent({
  displayName: 'Card',
  view,
  styles,
  tokens,
  statics: CardStatics
});

export default Card;
