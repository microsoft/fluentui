import * as React from 'react';
import { createComponent } from '@uifabric/foundation';
import { CardSectionStyles as styles, CardSectionTokens as tokens } from './CardSection.styles';
import { ICardSectionProps } from './CardSection.types';
import { CardSectionView } from './CardSection.view';

export const CardSection: React.FunctionComponent<ICardSectionProps> = createComponent(CardSectionView, {
  displayName: 'CardSection',
  styles,
  tokens
});

export default CardSection;
