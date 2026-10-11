'use client';

import clsx from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { useDrawerFooterStyles } from '../../Drawer/DrawerFooter/useDrawerFooterStyles.styles';
import type { NavDrawerFooterSlots, NavDrawerFooterState } from './NavDrawerFooter.types';
import styles from './NavDrawerFooter.module.css';

export const navDrawerFooterClassNames: SlotClassNames<NavDrawerFooterSlots> = {
  root: 'fui-NavDrawerFooter',
};

export const useNavDrawerFooterStyles = (state: NavDrawerFooterState): NavDrawerFooterState => {
  // eslint-disable-next-line react-hooks/immutability
  state.root.className = clsx(navDrawerFooterClassNames.root, styles.root, state.root.className);
  useDrawerFooterStyles(state);

  return state;
};
