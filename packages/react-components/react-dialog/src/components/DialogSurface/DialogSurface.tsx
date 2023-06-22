import * as React from 'react';
import { useDialogSurface_unstable } from './useDialogSurface';
import { renderDialogSurface_unstable } from './renderDialogSurface';
import { useDialogSurfaceStyles_unstable } from './useDialogSurfaceStyles.styles';
import type { DialogSurfaceProps } from './DialogSurface.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useDialogSurfaceContextValues_unstable } from './useDialogSurfaceContextValues';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';

/**
 * DialogSurface component represents the visual part of a `Dialog` as a whole,
 * it contains everything that should be visible.
 */
export const DialogSurface: ForwardRefComponent<DialogSurfaceProps> = React.forwardRef((props, ref) => {
  const state = useDialogSurface_unstable(props, ref);
  const contextValues = useDialogSurfaceContextValues_unstable(state);

  useDialogSurfaceStyles_unstable(state);

  useCustomStyleHook_unstable('useDialogSurfaceStyles_unstable')(state);

  return renderDialogSurface_unstable(state, contextValues);
});

DialogSurface.displayName = 'DialogSurface';
