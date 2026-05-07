'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useDialogActions } from './useDialogActions';
import { renderDialogActions } from './renderDialogActions';
import type { DialogActionsProps } from './DialogActions.types';

/**
 * `DialogActions` is a `<footer>` container for dialog action buttons (1–3 actions).
 */
export const DialogActions: ForwardRefComponent<DialogActionsProps> = React.forwardRef((props, ref) => {
  const state = useDialogActions(props, ref);
  return renderDialogActions(state);
});

DialogActions.displayName = 'DialogActions';
