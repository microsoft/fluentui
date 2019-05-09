import * as React from 'react';
import { createComponent } from '@uifabric/foundation';
import { CardSectionStyles as styles, CardSectionTokens as tokens } from './CardSection.styles';
import { ICardSectionProps } from './CardSection.types';
import { CardSectionView as view } from './CardSection.view';

export const CardSection: React.FunctionComponent<ICardSectionProps> = createComponent({
  displayName: 'CardSection',
  styles,
  tokens,
  view
});

export default CardSection;
