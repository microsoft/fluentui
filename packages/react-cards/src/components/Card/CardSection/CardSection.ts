import * as React from 'react';
import { createComponent } from '@uifabric/foundation';
import { CardSectionStyles as styles, CardSectionTokens as tokens } from './CardSection.styles';
import { ICardSectionProps } from './CardSection.types';
import { CardSectionView } from './CardSection.view';

/* eslint-disable deprecation/deprecation */

/**
 * @deprecated This component was experimental and is not longer being developed on, nor will it be supported in the
 * future.
 */
export const CardSection: React.FunctionComponent<ICardSectionProps> = createComponent(CardSectionView, {
  displayName: 'CardSection',
  styles,
  tokens,
});

/**
 * @deprecated This component was experimental and is not longer being developed on, nor will it be supported in the
 * future.
 */
export default CardSection;
