import clsx from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { NavSectionHeaderSlots, NavSectionHeaderState } from './NavSectionHeader.types';
import styles from './NavSectionHeader.module.css';

export const navSectionHeaderClassNames: SlotClassNames<NavSectionHeaderSlots> = {
  root: 'fui-NavSectionHeader',
};

export const useNavSectionHeaderStyles = (state: NavSectionHeaderState): NavSectionHeaderState => {
  state.root.className = clsx(navSectionHeaderClassNames.root, styles.root, state.root.className);

  return state;
};
