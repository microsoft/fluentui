'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useDialogTitle } from './useDialogTitle';
import { renderDialogTitle } from './renderDialogTitle';
import type { DialogTitleProps } from './DialogTitle.types';

/**
 * `DialogTitle` renders a heading element whose `id` is automatically wired to
 * `aria-labelledby` on `DialogSurface`, providing an accessible name for the dialog.
 *
 * Defaults to `<h2>`. Override the element via the `root` slot:
 * `<DialogTitle root="h1" />`
 */
export const DialogTitle: ForwardRefComponent<DialogTitleProps> = React.forwardRef((props, ref) => {
  const state = useDialogTitle(props, ref);
  return renderDialogTitle(state);
});

DialogTitle.displayName = 'DialogTitle';
