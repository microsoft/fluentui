'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { NavDrawerHeaderProps } from './NavDrawerHeader.types';
import { renderNavDrawerHeader } from './renderNavDrawerHeader';
import { useNavDrawerHeader } from './useNavDrawerHeader';
import { useNavDrawerHeaderStyles } from './useNavDrawerHeaderStyles.styles';

export const NavDrawerHeader: ForwardRefComponent<NavDrawerHeaderProps> = React.forwardRef((props, ref) => {
  const state = useNavDrawerHeader(props, ref);

  useNavDrawerHeaderStyles(state);

  return renderNavDrawerHeader(state);
});

NavDrawerHeader.displayName = 'NavDrawerHeader';
