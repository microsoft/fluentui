import clsx from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { MenuSplitGroupSlots, MenuSplitGroupState } from './MenuSplitGroup.types';
import styles from './MenuSplitGroup.module.css';

export const menuSplitGroupClassNames: SlotClassNames<MenuSplitGroupSlots> = { root: 'fui-MenuSplitGroup' };
export const menuSplitGroupMultilineAttr = 'data-multiline';

export const useMenuSplitGroupStyles = (state: MenuSplitGroupState): MenuSplitGroupState => {
  state.root.className = clsx(menuSplitGroupClassNames.root, styles.menuSplitGroup, state.root.className);
  return state;
};
