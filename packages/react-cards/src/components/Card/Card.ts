import * as React from 'react';
import { createComponent } from '@fluentui/foundation-legacy';
import { CardView } from './Card.view';
import { CardStyles as styles, CardTokens as tokens } from './Card.styles';
import { CardItem } from './CardItem/CardItem';
import { CardSection } from './CardSection/CardSection';
import type { ICardProps } from './Card.types';
import type { ICardItemProps } from './CardItem/CardItem.types';
import type { ICardSectionProps } from './CardSection/CardSection.types';

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
