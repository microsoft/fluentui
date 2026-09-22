'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { NavDrawerFooterProps } from './NavDrawerFooter.types';
import { renderNavDrawerFooter } from './renderNavDrawerFooter';
import { useNavDrawerFooter } from './useNavDrawerFooter';
import { useNavDrawerFooterStyles } from './useNavDrawerFooterStyles.styles';

export const NavDrawerFooter: ForwardRefComponent<NavDrawerFooterProps> = React.forwardRef((props, ref) => {
  const state = useNavDrawerFooter(props, ref);

  useNavDrawerFooterStyles(state);

  return renderNavDrawerFooter(state);
});

NavDrawerFooter.displayName = 'NavDrawerFooter';
