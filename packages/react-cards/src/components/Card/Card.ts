import * as React from 'react';
import { createComponent } from '@uifabric/foundation';
import { CardView } from './Card.view';
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

export const Card: React.FunctionComponent<ICardProps> & {
  Item: React.FunctionComponent<ICardItemProps>;
  Section: React.FunctionComponent<ICardSectionProps>;
} = createComponent(CardView, {
  displayName: 'Card',
  styles,
  tokens,
  statics: CardStatics
});

export default Card;
