import * as React from 'react';
import { createComponent } from '../../../Foundation';
import { MenuButtonState as state } from './MenuButton.state';
import { MenuButtonStyles as styles, MenuButtonTokens as tokens } from './MenuButton.styles';
import { IMenuButtonProps } from './MenuButton.types';
import { MenuButtonView as view } from './MenuButton.view';

export const MenuButton: React.StatelessComponent<IMenuButtonProps> = createComponent({
  displayName: 'MenuButton',
  styles,
  state,
  tokens,
  view
});

export default MenuButton;
