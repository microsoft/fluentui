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
  // Griffel merges Button's atomic appearance classes after these styles, so Button's colors win for every
  // appearance that sets them: the background is overridden by every appearance but secondary, the text and border
  // colors by every appearance but secondary and outline.
  const { appearance } = state;
  // eslint-disable-next-line react-hooks/immutability
  state.root.className = clsx(
    hamburgerClassNames.root,
    styles.root,
    appearance === 'secondary' && styles.background,
    (appearance === 'secondary' || appearance === 'outline') && styles.borderColor,
    state.root.className,
  );
  if (state.icon) {
    // eslint-disable-next-line react-hooks/immutability
    state.icon.className = clsx(hamburgerClassNames.icon, state.icon.className);
  }
  return state;
};
