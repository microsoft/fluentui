import * as React from 'react';
import { createComponent } from '@fluentui/foundation-legacy';
import { CardView } from './Card.view';
import { CardStyles as styles, CardTokens as tokens } from './Card.styles';
import { ICardProps } from './Card.types';
import { CardItem } from './CardItem/CardItem';
import { ICardItemProps } from './CardItem/CardItem.types';
import { CardSection } from './CardSection/CardSection';
import { ICardSectionProps } from './CardSection/CardSection.types';

const CardStatics = {
  Item: CardItem,
  Section: CardSection,
};

/**
 * @deprecated This component was experimental and is no longer being developed on, nor will it be supported in the
 * future.
 */
export const Card: React.FunctionComponent<ICardProps> & {
  Item: React.FunctionComponent<ICardItemProps>;
  Section: React.FunctionComponent<ICardSectionProps>;
} = createComponent(CardView, {
  displayName: 'Card',
  styles,
  tokens,
  statics: CardStatics,
});

/**
 * @deprecated This component was experimental and is no longer being developed on, nor will it be supported in the
 * future.
 */
export default Card;
