'use client';

import { clsx } from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { useButtonStyles_unstable } from '../Button/useButtonStyles.styles.css';
import type { MenuButtonSlots, MenuButtonState } from './MenuButton.types';
import styles from './MenuButton.module.css';

export const menuButtonClassNames: SlotClassNames<MenuButtonSlots> = {
  root: 'fui-MenuButton',
  icon: 'fui-MenuButton__icon',
  menuIcon: 'fui-MenuButton__menuIcon',
};

export const useMenuButtonStyles_unstable = (state: MenuButtonState): MenuButtonState => {
  // eslint-disable-next-line react-hooks/immutability
  state.root.className = clsx(
    menuButtonClassNames.root,
    styles.root,
    styles[state.appearance],
    styles[state.size],
    state.root['aria-expanded'] && styles.expanded,
    state.iconOnly && styles.iconOnly,
    state.root.className,
  );
  if (state.icon) {
    // eslint-disable-next-line react-hooks/immutability
    state.icon.className = clsx(menuButtonClassNames.icon, styles.icon, state.icon.className);
  }
  if (state.menuIcon) {
    // eslint-disable-next-line react-hooks/immutability
    state.menuIcon.className = clsx(menuButtonClassNames.menuIcon, styles.menuIcon, state.menuIcon.className);
  }

  useButtonStyles_unstable({ ...state, iconPosition: 'before' });
  return state;
};
