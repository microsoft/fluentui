import { clsx } from 'clsx';
import { getTriggerChild } from '@fluentui/react-utilities';
import styles from './Overflow.module.css';
import type { OverflowComponentState } from './Overflow.types';

export const useOverflowStyles = (): typeof styles => styles;

export const useOverflowStyles_unstable = (state: OverflowComponentState): OverflowComponentState => {
  const child = getTriggerChild<HTMLElement>(state.children);

  state.className = clsx('fui-Overflow', styles.overflowMenu, styles.overflowingItems, child?.props.className);

  return state;
};
