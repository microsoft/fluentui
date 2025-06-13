import * as React from 'react';
import { renderDrawerBody_unstable } from '@fluentui/react-drawer';
import { useNavDrawerBody_unstable } from './useNavDrawerBody';
import { useNavDrawerBodyStyles_unstable } from './useNavDrawerBodyStyles.styles';

import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { NavDrawerBodyProps } from './NavDrawerBody.types';

/**
 * NavDrawerBody component
 */
export const NavDrawerBody: ForwardRefComponent<NavDrawerBodyProps> = React.forwardRef((props, ref) => {
  const state = useNavDrawerBody_unstable(props, ref);

  useNavDrawerBodyStyles_unstable(state);
  // TODO update types in packages/react-components/react-shared-contexts/src/CustomStyleHooksContext/CustomStyleHooksContext.ts
  // https://github.com/microsoft/fluentui/blob/master/rfcs/react-components/convergence/custom-styling.md
  // useCustomStyleHook_unstable('useNavDrawerBodyStyles_unstable')(state);
  return renderDrawerBody_unstable(state);
});

NavDrawerBody.displayName = 'NavDrawerBody';
