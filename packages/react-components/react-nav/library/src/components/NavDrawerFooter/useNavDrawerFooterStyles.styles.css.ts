'use client';

import { clsx } from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { NavDrawerFooterSlots, NavDrawerFooterState } from './NavDrawerFooter.types';
import { useDrawerFooterStyles_unstable } from '@fluentui/react-drawer';
import styles from './NavDrawerFooter.module.css';

export const navDrawerFooterClassNames: SlotClassNames<NavDrawerFooterSlots> = {
  root: 'fui-NavDrawerFooter',
};

export const useNavDrawerFooterStyles_unstable = (state: NavDrawerFooterState): NavDrawerFooterState => {
  useDrawerFooterStyles_unstable(state);
  // eslint-disable-next-line react-hooks/immutability
  state.root.className = clsx(navDrawerFooterClassNames.root, styles.root, state.root.className);
  return state;
};
