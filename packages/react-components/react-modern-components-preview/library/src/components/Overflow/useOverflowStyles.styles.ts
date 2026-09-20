import clsx from 'clsx';
import { getTriggerChild } from '@fluentui/react-utilities';
import type { OverflowComponentState } from './Overflow.types';
import styles from './Overflow.module.css';

export const overflowClassNames = {
  root: 'fui-Overflow',
} as const;

export const useOverflowStyles = (state: OverflowComponentState): OverflowComponentState => {
  const child = getTriggerChild<HTMLElement>(state.children);

  state.className = clsx(overflowClassNames.root, styles.root, child?.props.className);

  return state;
};
