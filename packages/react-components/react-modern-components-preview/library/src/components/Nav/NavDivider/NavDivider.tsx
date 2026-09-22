'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { NavDividerProps } from './NavDivider.types';
import { renderNavDivider } from './renderNavDivider';
import { useNavDivider } from './useNavDivider';
import { useNavDividerStyles } from './useNavDividerStyles.styles';

export const NavDivider: ForwardRefComponent<NavDividerProps> = React.forwardRef((props, ref) => {
  const state = useNavDivider(props, ref);

  useNavDividerStyles(state);

  return renderNavDivider(state);
});

NavDivider.displayName = 'NavDivider';
