import * as React from 'react';
import { createComponent } from '../../../Foundation';
import { SplitButtonStyles as styles, SplitButtonTokens as tokens } from './SplitButton.styles';
import { ISplitButtonProps } from './SplitButton.types';
import { SplitButtonView } from './SplitButton.view';

export const SplitButton: React.StatelessComponent<ISplitButtonProps> = createComponent(SplitButtonView, {
  displayName: 'SplitButton',
  styles,
  tokens
});

export default SplitButton;
