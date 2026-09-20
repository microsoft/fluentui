'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { NavDrawerProps } from './NavDrawer.types';
import { renderNavDrawer } from './renderNavDrawer';
import { useNavDrawer } from './useNavDrawer';
import { useNavContextValues } from '../Nav/useNav';
import { useNavDrawerStyles } from './useNavDrawerStyles.styles';

export const NavDrawer: ForwardRefComponent<NavDrawerProps> = React.forwardRef((props, ref) => {
  const state = useNavDrawer(props, ref);
  const contextValues = useNavContextValues(state);

  useNavDrawerStyles(state);

  return renderNavDrawer(state, contextValues);
}) as ForwardRefComponent<NavDrawerProps>;

NavDrawer.displayName = 'NavDrawer';
