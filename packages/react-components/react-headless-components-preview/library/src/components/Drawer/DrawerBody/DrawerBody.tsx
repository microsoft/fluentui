'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { DrawerBodyProps } from './DrawerBody.types';
import { renderDrawerBody } from './renderDrawerBody';
import { useDrawerBody } from './useDrawerBody';

/**
 * DrawerBody provides a container for the main content of a Drawer.
 */
export const DrawerBody: ForwardRefComponent<DrawerBodyProps> = React.forwardRef((props, ref) => {
  const state = useDrawerBody(props, ref);

  return renderDrawerBody(state);
});

DrawerBody.displayName = 'DrawerBody';
