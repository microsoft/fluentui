'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { DrawerHeaderNavigationProps } from './DrawerHeaderNavigation.types';
import { renderDrawerHeaderNavigation } from './renderDrawerHeaderNavigation';
import { useDrawerHeaderNavigation } from './useDrawerHeaderNavigation';

/**
 * DrawerHeaderNavigation contains navigation content for a Drawer header.
 */
export const DrawerHeaderNavigation: ForwardRefComponent<DrawerHeaderNavigationProps> = React.forwardRef(
  (props, ref) => {
    const state = useDrawerHeaderNavigation(props, ref);

    return renderDrawerHeaderNavigation(state);
  },
);

DrawerHeaderNavigation.displayName = 'DrawerHeaderNavigation';
