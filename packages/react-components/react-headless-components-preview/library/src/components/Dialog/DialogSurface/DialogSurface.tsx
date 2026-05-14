'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useDialogSurface } from './useDialogSurface';
import { renderDialogSurface } from './renderDialogSurface';
import type { DialogSurfaceProps } from './DialogSurface.types';

/**
 * `DialogSurface` renders the native HTML `<dialog>` element.
 *
 * Place it as a direct child of `Dialog` (alongside an optional `DialogTrigger`).
 * It manages open/close via `showModal()` / `show()` / `close()` imperatively,
 * keeping the native element in sync with the controlled `open` prop.
 *
 * The native `::backdrop` pseudo-element provides the modal backdrop.
 * Focus is trapped automatically when the dialog is opened as modal.
 */
export const DialogSurface: ForwardRefComponent<DialogSurfaceProps> = React.forwardRef((props, ref) => {
  const state = useDialogSurface(props, ref);
  return renderDialogSurface(state);
});

DialogSurface.displayName = 'DialogSurface';
