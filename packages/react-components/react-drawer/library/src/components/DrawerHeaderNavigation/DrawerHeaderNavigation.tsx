import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';

import { useDrawerHeaderNavigation_unstable } from './useDrawerHeaderNavigation';
import { renderDrawerHeaderNavigation_unstable } from './renderDrawerHeaderNavigation';
import { useDrawerHeaderNavigationStyles_unstable } from './useDrawerHeaderNavigationStyles.styles';
import type { DrawerHeaderNavigationProps } from './DrawerHeaderNavigation.types';

/**
 * DrawerHeaderNavigation provides a header navigation area for the Drawer.
 */
export const DrawerHeaderNavigation: ForwardRefComponent<DrawerHeaderNavigationProps> = React.forwardRef(
  (props, ref) => {
    const state = useDrawerHeaderNavigation_unstable(props, ref);

    useDrawerHeaderNavigationStyles_unstable(state);
    useCustomStyleHook_unstable('useDrawerHeaderNavigationStyles_unstable')(state);

    return renderDrawerHeaderNavigation_unstable(state);
  },
);

DrawerHeaderNavigation.displayName = 'DrawerHeaderNavigation';
