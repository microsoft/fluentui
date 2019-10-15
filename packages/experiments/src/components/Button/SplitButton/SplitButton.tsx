import * as React from 'react';
import { createComponent } from '../../../Foundation';
import { ButtonState as state } from '../Button.state';
import { SplitButtonStyles as styles, SplitButtonTokens as tokens } from './SplitButton.styles';
import { ISplitButtonProps } from './SplitButton.types';
import { SplitButtonView as view } from './SplitButton.view';

export const SplitButton: React.StatelessComponent<ISplitButtonProps> = createComponent({
  displayName: 'SplitButton',
  state,
  styles,
  tokens,
  view
});

export default SplitButton;
