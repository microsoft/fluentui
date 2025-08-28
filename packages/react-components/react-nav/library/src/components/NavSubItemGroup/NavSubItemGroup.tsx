import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';

import { useNavSubItemGroup_unstable } from './useNavSubItemGroup';
import { renderNavSubItemGroup_unstable } from './renderNavSubItemGroup';
import { useNavSubItemGroupStyles_unstable } from './useNavSubItemGroupStyles.styles';
import type { NavSubItemGroupProps } from './NavSubItemGroup.types';

/**
 * NavSubItemGroup component - a group of sub-items within a navigation structure.
 */
export const NavSubItemGroup: ForwardRefComponent<NavSubItemGroupProps> = React.forwardRef((props, ref) => {
  const state = useNavSubItemGroup_unstable(props, ref);

  useNavSubItemGroupStyles_unstable(state);
  useCustomStyleHook_unstable('useNavSubItemGroupStyles_unstable')(state);

  return renderNavSubItemGroup_unstable(state);
});

NavSubItemGroup.displayName = 'NavSubItemGroup';
