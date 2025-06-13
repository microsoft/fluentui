import * as React from 'react';
import { useNavDrawerHeader_unstable } from './useNavDrawerHeader';
import { useNavDrawerHeaderStyles_unstable } from './useNavDrawerHeaderStyles.styles';
import { renderDrawerHeader_unstable } from '@fluentui/react-drawer';

import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { NavDrawerHeaderProps } from './NavDrawerHeader.types';

/**
 * NavDrawerHeader component
 */
export const NavDrawerHeader: ForwardRefComponent<NavDrawerHeaderProps> = React.forwardRef((props, ref) => {
  const state = useNavDrawerHeader_unstable(props, ref);

  useNavDrawerHeaderStyles_unstable(state);
  // TODO update types in packages/react-components/react-shared-contexts/src/CustomStyleHooksContext/CustomStyleHooksContext.ts
  // https://github.com/microsoft/fluentui/blob/master/rfcs/react-components/convergence/custom-styling.md
  // useCustomStyleHook_unstable('useNavDrawerHeaderStyles_unstable')(state);
  return renderDrawerHeader_unstable(state);
});

NavDrawerHeader.displayName = 'NavDrawerHeader';
