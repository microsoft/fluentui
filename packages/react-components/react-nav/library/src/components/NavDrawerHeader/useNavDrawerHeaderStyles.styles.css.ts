'use client';

import { clsx } from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { NavDrawerHeaderSlots, NavDrawerHeaderState } from './NavDrawerHeader.types';
import { useDrawerHeaderStyles_unstable } from '@fluentui/react-drawer';
import styles from './NavDrawerHeader.module.css';

export const navDrawerHeaderClassNames: SlotClassNames<NavDrawerHeaderSlots> = {
  root: 'fui-NavDrawerHeader',
};

export const useNavDrawerHeaderStyles_unstable = (state: NavDrawerHeaderState): NavDrawerHeaderState => {
  useDrawerHeaderStyles_unstable(state);
  // eslint-disable-next-line react-hooks/immutability
  state.root.className = clsx(navDrawerHeaderClassNames.root, styles.root, state.root.className);
  return state;
};
