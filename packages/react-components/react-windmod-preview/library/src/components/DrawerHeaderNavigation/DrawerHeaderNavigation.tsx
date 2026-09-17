'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import {
  renderDrawerHeaderNavigation,
  useDrawerHeaderNavigation,
} from '@fluentui/react-headless-components-preview/drawer';

import type { DrawerHeaderNavigationProps } from './DrawerHeaderNavigation.types';
import { useDrawerHeaderNavigationStyles } from './useDrawerHeaderNavigationStyles';

/**
 * A DrawerHeaderNavigation holds navigation controls inside a drawer header. Windmod DrawerHeaderNavigation: the headless part decorated with the Fluent visual contract
 * (Tailwind v4 + CSS Modules).
 */
export const DrawerHeaderNavigation: ForwardRefComponent<DrawerHeaderNavigationProps> = React.forwardRef(
  (props, ref) => {
    const state = useDrawerHeaderNavigation(props, ref);
    const styled = useDrawerHeaderNavigationStyles(state);

    return renderDrawerHeaderNavigation(styled);
  },
);

DrawerHeaderNavigation.displayName = 'DrawerHeaderNavigation';
