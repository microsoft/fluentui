'use client';

import clsx from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { useDividerStyles } from '../../Divider/useDividerStyles.styles';
import type { NavDividerSlots, NavDividerState } from './NavDivider.types';
import styles from './NavDivider.module.css';

export const navDividerClassNames: SlotClassNames<NavDividerSlots> = {
  root: 'fui-NavDivider',
  wrapper: 'fui-NavDivider__wrapper',
};

export const useNavDividerStyles = (state: NavDividerState): NavDividerState => {
  // eslint-disable-next-line react-hooks/immutability
  state.root.className = clsx(navDividerClassNames.root, styles.root, state.root.className);

  if (state.wrapper) {
    // eslint-disable-next-line react-hooks/immutability
    state.wrapper.className = clsx(navDividerClassNames.wrapper, state.wrapper.className);
  }

  useDividerStyles(state);

  return state;
};
