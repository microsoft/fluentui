import { createComponent } from '../../../Foundation';
import { useMenuButtonState as state } from './MenuButton.state';
import { MenuButtonStyles as styles, MenuButtonTokens as tokens } from './MenuButton.styles';
import { IMenuButtonProps } from './MenuButton.types';
import { MenuButtonView } from './MenuButton.view';

export const MenuButton: React.StatelessComponent<IMenuButtonProps> = createComponent(MenuButtonView, {
  displayName: 'MenuButton',
  state,
  styles,
  tokens
});

export default MenuButton;
