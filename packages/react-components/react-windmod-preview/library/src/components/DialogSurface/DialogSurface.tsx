'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import {
  renderDialogSurface,
  useDialogContext,
  useDialogSurface,
} from '@fluentui/react-headless-components-preview/dialog';

import type { DialogSurfaceProps } from './DialogSurface.types';
import { useDialogSurfaceStyles } from './useDialogSurfaceStyles';

/**
 * A DialogSurface is the dialog itself — a native `<dialog>` the browser promotes into the top
 * layer, painting its overlay as a real `::backdrop`. Windmod DialogSurface: the headless surface
 * decorated with the Fluent visual contract (Tailwind v4 + CSS Modules).
 *
 * It also carries the grid Griffel puts on a separate DialogBody element — see
 * DialogSurface.module.css for why the two rule sets merge onto one element, and what it costs.
 */
export const DialogSurface: ForwardRefComponent<DialogSurfaceProps> = React.forwardRef(
  (props: DialogSurfaceProps, ref: React.Ref<HTMLDialogElement>) =>
    renderDialogSurface(
      useDialogSurfaceStyles({ ...useDialogSurface(props, ref), nested: useDialogContext().isNestedDialog }),
    ),
);

DialogSurface.displayName = 'DialogSurface';
