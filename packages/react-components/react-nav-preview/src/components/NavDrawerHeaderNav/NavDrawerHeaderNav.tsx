import * as React from 'react';
import { renderDrawerHeaderNavigation_unstable } from '@fluentui/react-drawer';
import { useNavDrawerHeaderNav_unstable } from './useNavDrawerHeaderNav';
import { useNavDrawerHeaderNavStyles_unstable } from './useNavDrawerHeaderNavStyles.styles';

import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { NavDrawerHeaderNavProps } from './NavDrawerHeaderNav.types';
/**
 * NavDrawerHeaderNav component - TODO: add more docs
 */
export const NavDrawerHeaderNav: ForwardRefComponent<NavDrawerHeaderNavProps> = React.forwardRef((props, ref) => {
  const state = useNavDrawerHeaderNav_unstable(props, ref);

  useNavDrawerHeaderNavStyles_unstable(state);
  // TODO update types in packages/react-components/react-shared-contexts/src/CustomStyleHooksContext/CustomStyleHooksContext.ts
  // https://github.com/microsoft/fluentui/blob/master/rfcs/react-components/convergence/custom-styling.md
  // useCustomStyleHook_unstable('useNavDrawerHeaderNavStyles_unstable')(state);
  return renderDrawerHeaderNavigation_unstable(state);
});

NavDrawerHeaderNav.displayName = 'NavDrawerHeaderNav';
