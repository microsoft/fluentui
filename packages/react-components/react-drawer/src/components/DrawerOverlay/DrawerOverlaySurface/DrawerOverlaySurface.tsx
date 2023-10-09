import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import {
  useDialogSurface_unstable,
  useDialogSurfaceContextValues_unstable,
  renderDialogSurface_unstable,
} from '@fluentui/react-dialog';

import { useDrawerOverlaySurfaceStyles_unstable } from './useDrawerOverlaySurfaceStyles.styles';
import type { DrawerOverlaySurfaceProps } from './DrawerOverlaySurface.types';

/**
 * @internal
 * DrawerOverlaySurface is a proxy for DialogSurface as is only meant to be used internally for Drawer.
 */
export const DrawerOverlaySurface: ForwardRefComponent<DrawerOverlaySurfaceProps> = React.forwardRef((props, ref) => {
  const dialogSurfaceState = useDialogSurface_unstable(props, ref);
  const dialogSurfaceContextValues = useDialogSurfaceContextValues_unstable(dialogSurfaceState);

  useDrawerOverlaySurfaceStyles_unstable(dialogSurfaceState);

  return renderDialogSurface_unstable(dialogSurfaceState, dialogSurfaceContextValues);
});

DrawerOverlaySurface.displayName = 'DrawerOverlaySurface';
