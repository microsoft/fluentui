'use client';

import * as React from 'react';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

import { useNavDrawer_unstable } from './useNavDrawer';
import { renderNavDrawer_unstable } from './renderNavDrawer';
import { useNavDrawerStyles_unstable } from './useNavDrawerStyles.styles';
import { useNavContextValues_unstable } from '../useNavContextValues';
import type { NavState } from '../Nav/Nav.types';
import type { NavDrawerProps } from './NavDrawer.types';

/**
 * NavDrawer component - a component that provides a drawer for navigation items.
 */
export const NavDrawer: ForwardRefComponent<NavDrawerProps> = React.forwardRef((props, ref) => {
  let state = useNavDrawer_unstable(props, ref);
  const contextValues = useNavContextValues_unstable(state as NavState);

  state = useNavDrawerStyles_unstable(state);
  state = useCustomStyleHook_unstable('useNavDrawerStyles_unstable')(state);

  return renderNavDrawer_unstable(state, contextValues);
});

NavDrawer.displayName = 'NavDrawer';
