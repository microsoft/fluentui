'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

import { useNavDrawer } from './useNavDrawer';
import { renderNavDrawer } from './renderNavDrawer';
import { useNavContextValues } from '../useNavContextValues';
import type { NavDrawerProps } from './NavDrawer.types';
import { NavState } from '../Nav.types';

/**
 * NavDrawer component — a navigation drawer combining Nav behavior with Drawer layout.
 */
export const NavDrawer: ForwardRefComponent<NavDrawerProps> = React.forwardRef((props, ref) => {
  const state = useNavDrawer(props, ref as React.Ref<HTMLElement>);
  const contextValues = useNavContextValues(state as NavState);

  return renderNavDrawer(state, contextValues);
});

NavDrawer.displayName = 'NavDrawer';
