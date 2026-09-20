import clsx from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { NavSlots, NavState } from './Nav.types';
import styles from './Nav.module.css';

export const navClassNames: SlotClassNames<NavSlots> = {
  root: 'fui-Nav',
};

export const useNavStyles = (state: NavState): NavState => {
  state.root.className = clsx(navClassNames.root, styles.root, state.root.className);

  return state;
};
