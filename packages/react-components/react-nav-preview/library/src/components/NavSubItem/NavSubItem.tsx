import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
// import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';
import { useNavSubItem_unstable } from './useNavSubItem';
import { renderNavSubItem_unstable } from './renderNavSubItem';
import { useNavSubItemStyles_unstable } from './useNavSubItemStyles.styles';
import type { NavSubItemProps } from './NavSubItem.types';

/**
 * NavSubItem component - TODO: add more docs
 */
export const NavSubItem: ForwardRefComponent<NavSubItemProps> = React.forwardRef((props, ref) => {
  const state = useNavSubItem_unstable(props, ref);

  useNavSubItemStyles_unstable(state);
  // TODO update types in packages/react-components/react-shared-contexts/src/CustomStyleHooksContext/CustomStyleHooksContext.ts
  // https://github.com/microsoft/fluentui/blob/master/rfcs/react-components/convergence/custom-styling.md
  // useCustomStyleHook_unstable('useNavSubItemStyles_unstable')(state);
  return renderNavSubItem_unstable(state);
});

NavSubItem.displayName = 'NavSubItem';
