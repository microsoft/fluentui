'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { NavDrawerBodyProps } from './NavDrawerBody.types';
import { renderNavDrawerBody } from './renderNavDrawerBody';
import { useNavDrawerBody } from './useNavDrawerBody';
import { useNavDrawerBodyStyles } from './useNavDrawerBodyStyles.styles';

export const NavDrawerBody: ForwardRefComponent<NavDrawerBodyProps> = React.forwardRef((props, ref) => {
  const state = useNavDrawerBody(props, ref);

  useNavDrawerBodyStyles(state);

  return renderNavDrawerBody(state);
});

NavDrawerBody.displayName = 'NavDrawerBody';
