import { createComponent } from '@uifabric/foundation';
import { CardView as view } from './Card.view';
import { CardStyles as styles, CardTokens as tokens } from './Card.styles';
import { ICardProps } from './Card.types';
import { CardItem } from './CardItem/CardItem';
import { ICardItemProps } from './CardItem/CardItem.types';
import { CardSection } from './CardSection/CardSection';
import { ICardSectionProps } from './CardSection/CardSection.types';

const CardStatics = {
  Item: CardItem,
  Section: CardSection
};

export const Card: React.StatelessComponent<ICardProps> & {
  Item: React.StatelessComponent<ICardItemProps>;
  Section: React.StatelessComponent<ICardSectionProps>;
} = createComponent({
  displayName: 'Card',
  statics: CardStatics,
  styles,
  tokens,
  view
});

export default Card;
