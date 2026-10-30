import { clsx } from 'clsx';
import type { MenuSplitGroupSlots, MenuSplitGroupState } from './MenuSplitGroup.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import styles from './MenuSplitGroup.module.css';

export const menuSplitGroupMultilineAttr = 'data-multiline';

export const menuSplitGroupClassNames: SlotClassNames<MenuSplitGroupSlots> = {
  root: 'fui-MenuSplitGroup',
};

/**
 * Apply styling to the MenuSplitGroup slots based on the state
 */
export const useMenuSplitGroupStyles_unstable = (state: MenuSplitGroupState): MenuSplitGroupState => {
  state.root.className = clsx(menuSplitGroupClassNames.root, styles.root, state.root.className);
  return state;
};
