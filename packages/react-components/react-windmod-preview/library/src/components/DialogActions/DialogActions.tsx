'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { renderDialogActions, useDialogActions } from '@fluentui/react-headless-components-preview/dialog';

import type { DialogActionsProps } from './DialogActions.types';
import { useDialogActionsStyles } from './useDialogActionsStyles';

/**
 * A DialogActions holds the dialog's one to three action buttons. Windmod DialogActions: the
 * headless actions decorated with the Fluent visual contract, plus the position and fluid look
 * props Griffel declares on this same component.
 */
export const DialogActions: ForwardRefComponent<DialogActionsProps> = React.forwardRef(
  ({ position = 'end', fluid = false, ...rest }, ref) =>
    renderDialogActions(useDialogActionsStyles({ ...useDialogActions(rest, ref), position, fluid })),
);

DialogActions.displayName = 'DialogActions';
