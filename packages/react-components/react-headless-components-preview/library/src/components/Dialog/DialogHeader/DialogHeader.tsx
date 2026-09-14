'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useDialogHeader } from './useDialogHeader';
import { renderDialogHeader } from './renderDialogHeader';
import type { DialogHeaderProps } from './DialogHeader.types';

/**
 * `DialogHeader` is a `<header>` container for dialog title, subtitle, image,
 * and close button content.
 */
export const DialogHeader: ForwardRefComponent<DialogHeaderProps> = React.forwardRef((props, ref) => {
  const state = useDialogHeader(props, ref);
  return renderDialogHeader(state);
});

DialogHeader.displayName = 'DialogHeader';
