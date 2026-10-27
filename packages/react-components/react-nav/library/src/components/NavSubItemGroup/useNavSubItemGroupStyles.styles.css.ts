import { clsx } from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { NavSubItemGroupSlots, NavSubItemGroupState } from './NavSubItemGroup.types';
import styles from './NavSubItemGroup.module.css';

export const navSubItemGroupClassNames: SlotClassNames<Omit<NavSubItemGroupSlots, 'collapseMotion'>> = {
  root: 'fui-NavSubItemGroup',
};

export const useNavSubItemGroupStyles_unstable = (state: NavSubItemGroupState): NavSubItemGroupState => {
  state.root.className = clsx(navSubItemGroupClassNames.root, styles.root, state.root.className);
  return state;
};
