import { createComponent } from '../../../Foundation';
import { useMenuButtonState as state } from './MenuButton.state';
import { MenuButtonClassNames, MenuButtonStyles as styles, MenuButtonTokens as tokens } from './MenuButton.styles';
import { IMenuButtonProps } from './MenuButton.types';
import { MenuButtonView } from './MenuButton.view';

const classNames = Object.values(MenuButtonClassNames);

export const MenuButton: React.StatelessComponent<IMenuButtonProps> = createComponent(MenuButtonView, {
  classNames,
  displayName: 'MenuButton',
  state,
  styles,
  tokens
});

export default MenuButton;
