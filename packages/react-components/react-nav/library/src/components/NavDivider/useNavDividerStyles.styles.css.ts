'use client';

import { clsx } from 'clsx';
import { useDividerStyles_unstable, type DividerSlots } from '@fluentui/react-divider';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { NavDividerState } from './NavDivider.types';
import styles from './NavDivider.module.css';

export const navDividerClassNames: SlotClassNames<DividerSlots> = {
  root: 'fui-NavDivider',
  wrapper: 'fui-NavDivider__wrapper',
};

export const useNavDividerStyles_unstable = (state: NavDividerState): NavDividerState => {
  // eslint-disable-next-line react-hooks/immutability
  state.root.className = clsx(navDividerClassNames.root, styles.root, state.root.className);
  if (state.wrapper) {
    // eslint-disable-next-line react-hooks/immutability
    state.wrapper.className = clsx(navDividerClassNames.wrapper, state.wrapper.className);
  }
  useDividerStyles_unstable(state);
  return state;
};
