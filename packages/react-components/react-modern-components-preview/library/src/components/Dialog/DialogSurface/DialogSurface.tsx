'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { DialogSurfaceProps } from './DialogSurface.types';
import { renderDialogSurface } from './renderDialogSurface';
import { useDialogSurface } from './useDialogSurface';
import { useDialogSurfaceStyles } from './useDialogSurfaceStyles.styles';

/**
 * The styled native dialog surface.
 */
export const DialogSurface: ForwardRefComponent<DialogSurfaceProps> = React.forwardRef((props, ref) => {
  const state = useDialogSurface(props, ref);

  useDialogSurfaceStyles(state);

  return renderDialogSurface(state);
});

DialogSurface.displayName = 'DialogSurface';
