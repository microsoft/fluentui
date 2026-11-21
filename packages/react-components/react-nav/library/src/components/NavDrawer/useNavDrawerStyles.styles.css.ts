import { clsx } from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { NavDrawerState } from './NavDrawer.types';
import type { InlineDrawerSlots } from '@fluentui/react-drawer';
import styles from './NavDrawer.module.css';

export const navDrawerClassNames: SlotClassNames<Omit<InlineDrawerSlots, 'surfaceMotion'>> = {
  root: 'fui-NavDrawer',
};

export const useNavDrawerStyles_unstable = (state: NavDrawerState): NavDrawerState => {
  state.root.className = clsx(
    navDrawerClassNames.root,
    styles.root,
    !state.size && styles.defaultWidth,
    state.root.className,
  );
  return state;
};
