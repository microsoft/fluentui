import { mergeClasses } from '@griffel/react';
import type { MenuGroupState } from './MenuGroup.types';

export const menuGroupClassName = 'fui-MenuGroup';

export const useMenuGroupStyles_unstable = (state: MenuGroupState): MenuGroupState => {
  state.root.className = mergeClasses(menuGroupClassName, state.root.className);

  return state;
};
