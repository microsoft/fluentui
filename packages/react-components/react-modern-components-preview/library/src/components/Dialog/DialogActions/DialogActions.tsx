'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { DialogActionsProps } from './DialogActions.types';
import { renderDialogActions } from './renderDialogActions';
import { useDialogActions } from './useDialogActions';
import { useDialogActionsStyles } from './useDialogActionsStyles.styles';

/**
 * A layout container for Dialog action buttons.
 */
export const DialogActions: ForwardRefComponent<DialogActionsProps> = React.forwardRef((props, ref) => {
  const state = useDialogActions(props, ref);

  useDialogActionsStyles(state);

  return renderDialogActions(state);
});

DialogActions.displayName = 'DialogActions';
