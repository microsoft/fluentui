import clsx from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { EmptySwatchSlots, EmptySwatchState } from './EmptySwatch.types';
import styles from './EmptySwatch.module.css';

export const emptySwatchClassNames: SlotClassNames<EmptySwatchSlots> = {
  root: 'fui-EmptySwatch',
};

export const useEmptySwatchStyles = (state: EmptySwatchState): EmptySwatchState => {
  state.root.className = clsx(emptySwatchClassNames.root, styles.root, state.root.className);
  return state;
};
