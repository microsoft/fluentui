import * as React from 'react';
import { createComponent } from '../../../Foundation';
import { SplitMenuButtonStyles as styles, SplitMenuButtonTokens as tokens } from './SplitMenuButton.styles';
import { ISplitMenuButtonProps } from './SplitMenuButton.types';
import { SplitMenuButtonView as view } from './SplitMenuButton.view';

export const SplitMenuButton: React.StatelessComponent<ISplitMenuButtonProps> = createComponent({
  displayName: 'SplitMenuButton',
  styles,
  tokens,
  view
});

export default SplitMenuButton;
