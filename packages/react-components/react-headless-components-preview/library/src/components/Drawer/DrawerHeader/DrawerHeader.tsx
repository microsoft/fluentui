'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { DrawerHeaderProps } from './DrawerHeader.types';
import { renderDrawerHeader } from './renderDrawerHeader';
import { useDrawerHeader } from './useDrawerHeader';

/**
 * DrawerHeader contains header content for a Drawer.
 */
export const DrawerHeader: ForwardRefComponent<DrawerHeaderProps> = React.forwardRef((props, ref) => {
  const state = useDrawerHeader(props, ref);

  return renderDrawerHeader(state);
});

DrawerHeader.displayName = 'DrawerHeader';
