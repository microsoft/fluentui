'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { DrawerFooterProps } from './Drawer.types';
import { renderDrawerFooter } from './renderDrawer';
import { useDrawerFooter } from './useDrawer';
import { useDrawerFooterStyles } from './useDrawerStyles.styles';

/**
 * DrawerFooter contains footer content for a Drawer.
 */
export const DrawerFooter: ForwardRefComponent<DrawerFooterProps> = React.forwardRef((props, ref) => {
  const state = useDrawerFooter(props, ref);
  useDrawerFooterStyles(state);
  return renderDrawerFooter(state);
});

DrawerFooter.displayName = 'DrawerFooter';
