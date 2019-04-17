import { IStackItemProps } from 'office-ui-fabric-react';
import { createComponent } from '@uifabric/foundation';
import { CardView as view } from './Card.view';
import { CardStyles as styles, CardTokens as tokens } from './Card.styles';
import { ICardProps } from './Card.types';
import { CardItem } from './CardItem/CardItem';

const CardStatics = {
  Item: CardItem
};

export const Card: React.StatelessComponent<ICardProps> & {
  Item: React.StatelessComponent<IStackItemProps>;
} = createComponent({
  displayName: 'Card',
  view,
  styles,
  tokens,
  statics: CardStatics
});

export default Card;
