'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useDialogFooter } from './useDialogFooter';
import { renderDialogFooter } from './renderDialogFooter';
import type { DialogFooterProps } from './DialogFooter.types';

/**
 * `DialogFooter` is a `<footer>` container for dialog action buttons (1–3 actions).
 */
export const DialogFooter: ForwardRefComponent<DialogFooterProps> = React.forwardRef((props, ref) => {
  const state = useDialogFooter(props, ref);
  return renderDialogFooter(state);
});

DialogFooter.displayName = 'DialogFooter';
