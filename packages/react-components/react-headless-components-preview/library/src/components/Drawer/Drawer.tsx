'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { DrawerProps } from './Drawer.types';
import { renderDrawer } from './renderDrawer';
import { useDrawer } from './useDrawer';

/**
 * Drawer contains supplementary content for complex creation, edit, or management experiences.
 */
export const Drawer: ForwardRefComponent<DrawerProps> = React.forwardRef((props, ref) => {
  const state = useDrawer(props, ref);

  return renderDrawer(state);
});

Drawer.displayName = 'Drawer';
