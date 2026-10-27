'use client';

import { clsx } from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { HamburgerState } from './Hamburger.types';
import { useButtonStyles_unstable, type ButtonSlots } from '@fluentui/react-button';
import styles from './Hamburger.module.css';

export const hamburgerClassNames: SlotClassNames<ButtonSlots> = {
  root: 'fui-Hamburger',
  icon: 'fui-Hamburger__icon',
};

export const useHamburgerStyles_unstable = (state: HamburgerState): HamburgerState => {
  useButtonStyles_unstable(state);
  // eslint-disable-next-line react-hooks/immutability
  state.root.className = clsx(hamburgerClassNames.root, styles.root, state.root.className);
  if (state.icon) {
    // eslint-disable-next-line react-hooks/immutability
    state.icon.className = clsx(hamburgerClassNames.icon, state.icon.className);
  }
  return state;
};
