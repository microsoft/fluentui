import clsx from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { NavSubItemGroupSlots, NavSubItemGroupState } from './NavSubItemGroup.types';
import styles from './NavSubItemGroup.module.css';

export const navSubItemGroupClassNames: SlotClassNames<NavSubItemGroupSlots> = {
  root: 'fui-NavSubItemGroup',
  collapseMotion: 'fui-NavSubItemGroup__collapseMotion',
};

export const useNavSubItemGroupStyles = (state: NavSubItemGroupState): NavSubItemGroupState => {
  state.root.className = clsx(navSubItemGroupClassNames.root, styles.root, state.root.className);

  return state;
};
