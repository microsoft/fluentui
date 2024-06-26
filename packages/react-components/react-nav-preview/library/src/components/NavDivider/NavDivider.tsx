import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';
import { useNavDivider_unstable } from './useNavDivider';
import { renderNavDivider_unstable } from './renderNavDivider';
import { useNavDividerStyles_unstable } from './useNavDividerStyles.styles';
import type { NavDividerProps } from './NavDivider.types';

/**
 * NavDivider component - TODO: add more docs
 */
export const NavDivider: ForwardRefComponent<NavDividerProps> = React.forwardRef((props, ref) => {
  const state = useNavDivider_unstable(props, ref);

  useNavDividerStyles_unstable(state);
  // TODO update types in packages/react-components/react-shared-contexts/src/CustomStyleHooksContext/CustomStyleHooksContext.ts
  // https://github.com/microsoft/fluentui/blob/master/rfcs/react-components/convergence/custom-styling.md
  useCustomStyleHook_unstable('useNavDividerStyles_unstable')(state);
  return renderNavDivider_unstable(state);
});

NavDivider.displayName = 'NavDivider';
