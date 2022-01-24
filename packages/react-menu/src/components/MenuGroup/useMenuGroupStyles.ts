import { mergeClasses } from '@griffel/react';
import type { MenuGroupState } from './MenuGroup.types';

export const menuGroupClassName = 'fui-MenuGroup';

export const useMenuGroupStyles = (state: MenuGroupState): MenuGroupState => {
  state.root.className = mergeClasses(menuGroupClassName, state.root.className);

  return state;
};
