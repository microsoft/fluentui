import * as React from 'react';
import { createComponent } from '@uifabric/foundation';
import { CardItemStyles as styles, CardItemTokens as tokens } from './CardItem.styles';
import { ICardItemProps } from './CardItem.types';
import { CardItemView } from './CardItem.view';

/* eslint-disable deprecation/deprecation */

/**
 * @deprecated This component was experimental and is not longer being developed on, nor will it be supported in the
 * future.
 */
export const CardItem: React.FunctionComponent<ICardItemProps> = createComponent(CardItemView, {
  displayName: 'CardItem',
  styles,
  tokens,
});

/**
 * @deprecated This component was experimental and is not longer being developed on, nor will it be supported in the
 * future.
 */
export default CardItem;
