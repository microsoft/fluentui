import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import {
  useDialogContext_unstable,
  useDialogSurface_unstable,
  useDialogSurfaceContextValues_unstable,
  renderDialogSurface_unstable,
} from '@fluentui/react-dialog';

import { useDrawerOverlaySurfaceStyles_unstable } from './useDrawerOverlaySurfaceStyles.styles';
import type { DrawerOverlaySurfaceProps, DrawerOverlaySurfaceState } from './DrawerOverlaySurface.types';

/**
 * @internal
 * DrawerOverlaySurface is a proxy for DialogSurface as is only meant to be used internally for Drawer.
 */
export const DrawerOverlaySurface: ForwardRefComponent<DrawerOverlaySurfaceProps> = React.forwardRef((props, ref) => {
  const dialogSurfaceState = useDialogSurface_unstable(props, ref);
  const dialogSurfaceContextValues = useDialogSurfaceContextValues_unstable(dialogSurfaceState);
  const state: DrawerOverlaySurfaceState = {
    ...dialogSurfaceState,
    nested: useDialogContext_unstable(ctx => ctx.isNestedDialog),
  };

  useDrawerOverlaySurfaceStyles_unstable(state);

  return renderDialogSurface_unstable(state, dialogSurfaceContextValues);
});

DrawerOverlaySurface.displayName = 'DrawerOverlaySurface';
