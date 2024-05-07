import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useNavDrawerBody_unstable } from './useNavDrawerBody';
import { renderNavDrawerBody_unstable } from './renderNavDrawerBody';
import { useNavDrawerBodyStyles_unstable } from './useNavDrawerBodyStyles.styles';
import type { NavDrawerBodyProps } from './NavDrawerBody.types';

/**
 * NavDrawerBody component - TODO: add more docs
 */
export const NavDrawerBody: ForwardRefComponent<NavDrawerBodyProps> = React.forwardRef((props, ref) => {
  const state = useNavDrawerBody_unstable(props, ref);

  useNavDrawerBodyStyles_unstable(state);
  // TODO update types in packages/react-components/react-shared-contexts/src/CustomStyleHooksContext/CustomStyleHooksContext.ts
  // https://github.com/microsoft/fluentui/blob/master/rfcs/react-components/convergence/custom-styling.md
  // useCustomStyleHook_unstable('useNavDrawerBodyStyles_unstable')(state);
  return renderNavDrawerBody_unstable(state);
});

NavDrawerBody.displayName = 'NavDrawerBody';
