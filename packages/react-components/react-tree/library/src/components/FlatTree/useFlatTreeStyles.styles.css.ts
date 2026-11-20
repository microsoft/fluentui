import { clsx } from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { FlatTreeState, FlatTreeSlots } from './FlatTree.types';
import styles from './FlatTree.module.css';

export const flatTreeClassNames: SlotClassNames<Omit<FlatTreeSlots, 'collapseMotion'>> = {
  root: 'fui-FlatTree',
};

export const useFlatTreeStyles_unstable = (state: FlatTreeState): FlatTreeState => {
  state.root.className = clsx(flatTreeClassNames.root, styles.root, state.root.className);
  return state;
};
