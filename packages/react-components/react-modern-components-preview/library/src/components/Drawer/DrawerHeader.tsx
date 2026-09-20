'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { DrawerHeaderProps } from './Drawer.types';
import { renderDrawerHeader } from './renderDrawer';
import { useDrawerHeader } from './useDrawer';
import { useDrawerHeaderStyles } from './useDrawerStyles.styles';

/**
 * DrawerHeader contains header content for a Drawer.
 */
export const DrawerHeader: ForwardRefComponent<DrawerHeaderProps> = React.forwardRef((props, ref) => {
  const state = useDrawerHeader(props, ref);
  useDrawerHeaderStyles(state);
  return renderDrawerHeader(state);
});

DrawerHeader.displayName = 'DrawerHeader';
