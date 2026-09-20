'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { DrawerHeaderNavigationProps } from './Drawer.types';
import { renderDrawerHeaderNavigation } from './renderDrawer';
import { useDrawerHeaderNavigation } from './useDrawer';
import { useDrawerHeaderNavigationStyles } from './useDrawerStyles.styles';

/**
 * DrawerHeaderNavigation contains navigation content for a Drawer header.
 */
export const DrawerHeaderNavigation: ForwardRefComponent<DrawerHeaderNavigationProps> = React.forwardRef(
  (props, ref) => {
    const state = useDrawerHeaderNavigation(props, ref);
    useDrawerHeaderNavigationStyles(state);
    return renderDrawerHeaderNavigation(state);
  },
);

DrawerHeaderNavigation.displayName = 'DrawerHeaderNavigation';
