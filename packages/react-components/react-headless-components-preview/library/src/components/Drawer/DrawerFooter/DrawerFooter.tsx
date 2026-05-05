'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { DrawerFooterProps } from './DrawerFooter.types';
import { renderDrawerFooter } from './renderDrawerFooter';
import { useDrawerFooter } from './useDrawerFooter';

/**
 * DrawerFooter contains footer content for a Drawer.
 */
export const DrawerFooter: ForwardRefComponent<DrawerFooterProps> = React.forwardRef((props, ref) => {
  const state = useDrawerFooter(props, ref);

  return renderDrawerFooter(state);
});

DrawerFooter.displayName = 'DrawerFooter';
