'use client';

import clsx from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { useDrawerHeaderStyles } from '../../Drawer/DrawerHeader/useDrawerHeaderStyles.styles';
import type { NavDrawerHeaderSlots, NavDrawerHeaderState } from './NavDrawerHeader.types';
import styles from './NavDrawerHeader.module.css';

export const navDrawerHeaderClassNames: SlotClassNames<NavDrawerHeaderSlots> = {
  root: 'fui-NavDrawerHeader',
};

export const useNavDrawerHeaderStyles = (state: NavDrawerHeaderState): NavDrawerHeaderState => {
  // eslint-disable-next-line react-hooks/immutability
  state.root.className = clsx(navDrawerHeaderClassNames.root, styles.root, state.root.className);
  useDrawerHeaderStyles(state);

  return state;
};
