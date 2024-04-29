import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import {
  useDialogSurface_unstable,
  useDialogSurfaceContextValues_unstable,
  renderDialogSurface_unstable,
} from '@fluentui/react-dialog';

import { useOverlayDrawerSurfaceStyles_unstable } from './useOverlayDrawerSurfaceStyles.styles';
import type { OverlayDrawerSurfaceProps } from './OverlayDrawerSurface.types';

/**
 * @internal
 * OverlayDrawerSurface is a proxy for DialogSurface as is only meant to be used internally for Drawer.
 */
export const OverlayDrawerSurface: ForwardRefComponent<OverlayDrawerSurfaceProps> = React.forwardRef((props, ref) => {
  const dialogSurfaceState = useDialogSurface_unstable(props, ref);
  const dialogSurfaceContextValues = useDialogSurfaceContextValues_unstable(dialogSurfaceState);

  useOverlayDrawerSurfaceStyles_unstable(dialogSurfaceState);

  return renderDialogSurface_unstable(dialogSurfaceState, dialogSurfaceContextValues);
});

OverlayDrawerSurface.displayName = 'OverlayDrawerSurface';
