import clsx from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { MenuGroupSlots, MenuGroupState } from './MenuGroup.types';

export const menuGroupClassNames: SlotClassNames<MenuGroupSlots> = { root: 'fui-MenuGroup' };

export const useMenuGroupStyles = (state: MenuGroupState): MenuGroupState => {
  state.root.className = clsx(menuGroupClassNames.root, state.root.className);
  return state;
};
