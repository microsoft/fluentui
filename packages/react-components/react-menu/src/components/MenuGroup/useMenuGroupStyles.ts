import type { SlotClassNames } from '@fluentui/react-utilities';
import { mergeClasses } from '@griffel/react';
import type { MenuGroupSlots, MenuGroupState } from './MenuGroup.types';

/**
 * @deprecated Use `menuGroupClassNames.root` instead.
 */
export const menuGroupClassName = 'fui-MenuGroup';
export const menuGroupClassNames: SlotClassNames<MenuGroupSlots> = {
  root: 'fui-MenuGroup',
};

export const useMenuGroupStyles_unstable = (state: MenuGroupState): MenuGroupState => {
  state.root.className = mergeClasses(menuGroupClassNames.root, state.root.className);

  return state;
};
