'use client';

import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useDialogActions } from './useDialogActions';
import { renderDialogActions } from './renderDialogActions';
import type { DialogActionsProps } from './DialogActions.types';
import { composeComponent } from '../../../utils/composeComponent';

/**
 * `DialogActions` is a `<footer>` container for dialog action buttons (1–3 actions).
 */
export const DialogActions: ForwardRefComponent<DialogActionsProps> = /*#__PURE__*/ composeComponent(
  'DialogActions',
  useDialogActions,
  renderDialogActions,
);
