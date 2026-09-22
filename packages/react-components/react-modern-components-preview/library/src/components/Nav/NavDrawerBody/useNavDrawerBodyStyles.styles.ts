'use client';

import clsx from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { useDrawerBodyStyles } from '../../Drawer/DrawerBody/useDrawerBodyStyles.styles';
import type { NavDrawerBodySlots, NavDrawerBodyState } from './NavDrawerBody.types';
import styles from './NavDrawerBody.module.css';

export const navDrawerBodyClassNames: SlotClassNames<NavDrawerBodySlots> = {
  root: 'fui-NavDrawerBody',
};

export const useNavDrawerBodyStyles = (state: NavDrawerBodyState): NavDrawerBodyState => {
  // eslint-disable-next-line react-hooks/immutability
  state.root.className = clsx(navDrawerBodyClassNames.root, styles.root, state.root.className);
  useDrawerBodyStyles(state);

  return state;
};
