import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';

import { useNavSubItem_unstable } from './useNavSubItem';
import { renderNavSubItem_unstable } from './renderNavSubItem';
import { useNavSubItemStyles_unstable } from './useNavSubItemStyles.styles';
import type { NavSubItemProps } from './NavSubItem.types';

/**
 * NavSubItem component - a sub-item within a navigation structure.
 */
export const NavSubItem: ForwardRefComponent<NavSubItemProps> = React.forwardRef((props, ref) => {
  const state = useNavSubItem_unstable(props, ref);

  useNavSubItemStyles_unstable(state);
  useCustomStyleHook_unstable('useNavSubItemStyles_unstable')(state);

  return renderNavSubItem_unstable(state);
});

NavSubItem.displayName = 'NavSubItem';
