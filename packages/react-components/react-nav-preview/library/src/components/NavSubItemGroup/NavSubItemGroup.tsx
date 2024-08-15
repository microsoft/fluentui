import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
// import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';
import { useNavSubItemGroup_unstable } from './useNavSubItemGroup';
import { renderNavSubItemGroup_unstable } from './renderNavSubItemGroup';
import { useNavSubItemGroupStyles_unstable } from './useNavSubItemGroupStyles.styles';
import type { NavSubItemGroupProps } from './NavSubItemGroup.types';

/**
 * NavSubItemGroup component - TODO: add more docs
 */
export const NavSubItemGroup: ForwardRefComponent<NavSubItemGroupProps> = React.forwardRef((props, ref) => {
  const state = useNavSubItemGroup_unstable(props, ref);

  useNavSubItemGroupStyles_unstable(state);
  // TODO update types in packages/react-components/react-shared-contexts/src/CustomStyleHooksContext/CustomStyleHooksContext.ts
  // https://github.com/microsoft/fluentui/blob/master/rfcs/react-components/convergence/custom-styling.md
  // useCustomStyleHook_unstable('useNavSubItemGroupStyles_unstable')(state);
  return renderNavSubItemGroup_unstable(state);
});

NavSubItemGroup.displayName = 'NavSubItemGroup';
