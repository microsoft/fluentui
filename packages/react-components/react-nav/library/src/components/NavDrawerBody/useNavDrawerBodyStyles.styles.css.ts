'use client';

import { clsx } from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { NavDrawerBodySlots, NavDrawerBodyState } from './NavDrawerBody.types';
import { useDrawerBodyStyles_unstable } from '@fluentui/react-drawer';
import styles from './NavDrawerBody.module.css';

export const navDrawerBodyClassNames: SlotClassNames<NavDrawerBodySlots> = {
  root: 'fui-NavDrawerBody',
};

export const useNavDrawerBodyStyles_unstable = (state: NavDrawerBodyState): NavDrawerBodyState => {
  useDrawerBodyStyles_unstable(state);
  // eslint-disable-next-line react-hooks/immutability
  state.root.className = clsx(navDrawerBodyClassNames.root, styles.root, state.root.className);
  return state;
};
