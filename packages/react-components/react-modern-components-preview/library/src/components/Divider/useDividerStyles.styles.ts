import clsx from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { DividerSlots, DividerState } from './Divider.types';
import styles from './Divider.module.css';

export const dividerClassNames: SlotClassNames<DividerSlots> = {
  root: 'fui-Divider',
  wrapper: 'fui-Divider__wrapper',
};

/**
 * Apply styling to the Divider slots based on the state.
 */
export const useDividerStyles = (state: DividerState): DividerState => {
  state.root.className = clsx(dividerClassNames.root, styles.root, state.root.className);

  if (state.wrapper) {
    state.wrapper.className = clsx(dividerClassNames.wrapper, state.wrapper.className);
  }

  return state;
};
