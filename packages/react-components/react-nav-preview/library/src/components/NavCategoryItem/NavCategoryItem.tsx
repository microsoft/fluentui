import * as React from 'react';
import { useNavCategoryItem_unstable } from './useNavCategoryItem';
import { renderNavCategoryItem_unstable } from './renderNavCategoryItem';
import type { NavCategoryItemProps } from './NavCategoryItem.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useNavCategoryItemStyles_unstable } from './useNavCategoryItem.styles';
import { useNavCategoryItemContextValues_unstable } from '../useNavCategoryItemContextValues_unstable';
// import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';

/**
 * A Nav Category Item provides provides a clickable accordion like header that exposes
 * a list of NavSubItems to take users to a new destination.
 */
export const NavCategoryItem: ForwardRefComponent<NavCategoryItemProps> = React.forwardRef((props, ref) => {
  const state = useNavCategoryItem_unstable(props, ref);
  const contextValues = useNavCategoryItemContextValues_unstable(state);

  useNavCategoryItemStyles_unstable(state);

  // todo: add custom style hook
  // useCustomStyleHook_unstable('useNavCategoryItemStyles')(state);

  return renderNavCategoryItem_unstable(state, contextValues);
});

NavCategoryItem.displayName = 'NavCategoryItem';
