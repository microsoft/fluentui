import * as React from 'react';
import { createComponent } from '@fluentui/foundation-legacy';
import { CardItemStyles as styles, CardItemTokens as tokens } from './CardItem.styles';
import { ICardItemProps } from './CardItem.types';
import { CardItemView } from './CardItem.view';

/**
 * @deprecated This component was experimental and is no longer being developed on, nor will it be supported in the
 * future.
 */
export const CardItem: React.FunctionComponent<ICardItemProps> = createComponent(CardItemView, {
  displayName: 'CardItem',
  styles,
  tokens,
});

/**
 * @deprecated This component was experimental and is no longer being developed on, nor will it be supported in the
 * future.
 */
export default CardItem;
