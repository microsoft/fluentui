import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

import { useDrawerOverlaySurface_unstable } from './useDrawerOverlaySurface';
import { renderDrawerOverlaySurface_unstable } from './renderDrawerOverlaySurface';
import { useDrawerOverlaySurfaceStyles_unstable } from './useDrawerOverlaySurfaceStyles.styles';
import type { DrawerOverlaySurfaceProps } from './DrawerOverlaySurface.types';

/**
 * @internal
 * DrawerOverlaySurface is a proxy for DialogSurface as is only meant to be used internally for Drawer.
 */
export const DrawerOverlaySurface: ForwardRefComponent<DrawerOverlaySurfaceProps> = React.forwardRef((props, ref) => {
  const state = useDrawerOverlaySurface_unstable(props, ref);

  useDrawerOverlaySurfaceStyles_unstable(state);

  return renderDrawerOverlaySurface_unstable(state);
});

DrawerOverlaySurface.displayName = 'DrawerOverlaySurface';
