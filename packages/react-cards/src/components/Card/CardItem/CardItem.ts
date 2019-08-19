import * as React from 'react';
import { createComponent } from '@uifabric/foundation';
import { CardItemStyles as styles, CardItemTokens as tokens } from './CardItem.styles';
import { ICardItemProps } from './CardItem.types';
import { CardItemView } from './CardItem.view';

export const CardItem: React.FunctionComponent<ICardItemProps> = createComponent(CardItemView, {
  displayName: 'CardItem',
  styles,
  tokens
});

export default CardItem;
