'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { DrawerBodyProps } from './Drawer.types';
import { renderDrawerBody } from './renderDrawer';
import { useDrawerBody } from './useDrawer';
import { useDrawerBodyStyles } from './useDrawerStyles.styles';

/**
 * DrawerBody provides a container for the main content of a Drawer.
 */
export const DrawerBody: ForwardRefComponent<DrawerBodyProps> = React.forwardRef((props, ref) => {
  const state = useDrawerBody(props, ref);
  useDrawerBodyStyles(state);
  return renderDrawerBody(state);
});

DrawerBody.displayName = 'DrawerBody';
