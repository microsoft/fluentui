import * as React from 'react';
import { createComponent } from '@uifabric/foundation';
import { CardItemStyles as styles, CardItemTokens as tokens } from './CardItem.styles';
import { ICardItemProps } from './CardItem.types';
import { CardItemView as view } from './CardItem.view';

export const CardItem: React.StatelessComponent<ICardItemProps> = createComponent({
  displayName: 'CardItem',
  styles,
  tokens,
  view
});

export default CardItem;
