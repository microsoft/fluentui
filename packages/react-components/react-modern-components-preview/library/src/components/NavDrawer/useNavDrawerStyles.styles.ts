import clsx from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { NavDrawerSlots, NavDrawerState } from './NavDrawer.types';
import styles from './NavDrawer.module.css';

export const navDrawerClassNames: SlotClassNames<NavDrawerSlots> = {
  root: 'fui-NavDrawer',
};

export const useNavDrawerStyles = (state: NavDrawerState): NavDrawerState => {
  state.root.className = clsx(navDrawerClassNames.root, styles.root, state.root.className);

  return state;
};
