import * as React from 'react';
// import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';
import { useNavDrawer_unstable } from './useNavDrawer';
import { renderNavDrawer_unstable } from './renderNavDrawer';
import { useNavDrawerStyles_unstable } from './useNavDrawerStyles.styles';
import { useNavContextValues_unstable } from '../useNavContextValues';
import { NavState } from '../Nav/Nav.types';

import type { NavDrawerProps } from './NavDrawer.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * NavDrawer component - TODO: add more docs
 */
export const NavDrawer: ForwardRefComponent<NavDrawerProps> = React.forwardRef((props, ref) => {
  const state = useNavDrawer_unstable(props, ref);
  const contextValues = useNavContextValues_unstable(state as NavState);

  useNavDrawerStyles_unstable(state);
  // TODO update types in packages/react-components/react-shared-contexts/src/CustomStyleHooksContext/CustomStyleHooksContext.ts
  // https://github.com/microsoft/fluentui/blob/master/rfcs/react-components/convergence/custom-styling.md
  // useCustomStyleHook_unstable('useNavDrawerStyles_unstable')(state);
  return renderNavDrawer_unstable(state, contextValues);
});

NavDrawer.displayName = 'NavDrawer';
