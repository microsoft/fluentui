import * as React from 'react';
import { renderDivider_unstable } from '@fluentui/react-divider';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';

import { useNavDivider_unstable } from './useNavDivider';
import { useNavDividerStyles_unstable } from './useNavDividerStyles.styles';
import type { NavDividerProps } from './NavDivider.types';

/**
 * NavDivider component - a divider used within navigation components to separate items.
 */
export const NavDivider: ForwardRefComponent<NavDividerProps> = React.forwardRef((props, ref) => {
  const state = useNavDivider_unstable(props, ref);

  useNavDividerStyles_unstable(state);
  useCustomStyleHook_unstable('useNavDividerStyles_unstable')(state);

  return renderDivider_unstable(state);
});

NavDivider.displayName = 'NavDivider';
