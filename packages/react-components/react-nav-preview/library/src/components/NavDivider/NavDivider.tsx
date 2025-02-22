import * as React from 'react';
import { useNavDivider_unstable } from './useNavDivider';
import { useNavDividerStyles_unstable } from './useNavDividerStyles.styles';
import { renderDivider_unstable } from '@fluentui/react-divider';

import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { NavDividerProps } from './NavDivider.types';

/**
 * NavDivider component - TODO: add more docs
 */
export const NavDivider: ForwardRefComponent<NavDividerProps> = React.forwardRef((props, ref) => {
  const state = useNavDivider_unstable(props, ref);

  useNavDividerStyles_unstable(state);
  // TODO update types in packages/react-components/react-shared-contexts/src/CustomStyleHooksContext/CustomStyleHooksContext.ts
  // https://github.com/microsoft/fluentui/blob/master/rfcs/react-components/convergence/custom-styling.md
  // useCustomStyleHook_unstable('useNavDividerStyles_unstable')(state);
  return renderDivider_unstable(state);
});

NavDivider.displayName = 'NavDivider';
