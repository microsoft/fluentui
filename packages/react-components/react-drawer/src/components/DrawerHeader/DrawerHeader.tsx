import * as React from 'react';
import { useDrawerHeader_unstable } from './useDrawerHeader';
import { renderDrawerHeader_unstable } from './renderDrawerHeader';
import { useDrawerHeaderStyles_unstable } from './useDrawerHeaderStyles';
import type { DrawerHeaderProps } from './DrawerHeader.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';

/**
 * DrawerHeader provides a structured header for the drawer component.
 */
export const DrawerHeader: ForwardRefComponent<DrawerHeaderProps> = React.forwardRef((props, ref) => {
  const state = useDrawerHeader_unstable(props, ref);

  useDrawerHeaderStyles_unstable(state);
  useCustomStyleHook_unstable('useDrawerHeaderStyles_unstable')(state);

  return renderDrawerHeader_unstable(state);
});

DrawerHeader.displayName = 'DrawerHeader';
