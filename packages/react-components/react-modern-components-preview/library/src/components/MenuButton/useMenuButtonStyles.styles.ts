import clsx from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { MenuButtonSlots, MenuButtonState } from './MenuButton.types';
import buttonStyles from '../Button/Button.module.css';
import styles from './MenuButton.module.css';

export const menuButtonClassNames: SlotClassNames<MenuButtonSlots> = {
  root: 'fui-MenuButton',
  icon: 'fui-MenuButton__icon',
  menuIcon: 'fui-MenuButton__menuIcon',
};

export const useMenuButtonStyles = (state: MenuButtonState): MenuButtonState => {
  state.root.className = clsx(menuButtonClassNames.root, buttonStyles.root, styles.root, state.root.className);

  if (state.icon) {
    state.icon.className = clsx(menuButtonClassNames.icon, buttonStyles.icon, styles.icon, state.icon.className);
  }

  if (state.menuIcon) {
    state.menuIcon.className = clsx(menuButtonClassNames.menuIcon, styles.menuIcon, state.menuIcon.className);
  }

  return state;
};
