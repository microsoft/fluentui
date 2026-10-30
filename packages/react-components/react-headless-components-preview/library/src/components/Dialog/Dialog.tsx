'use client';

import type * as React from 'react';
import { useDialog } from './useDialog';
import { useDialogContextValues } from './useDialogContextValues';
import { renderDialog } from './renderDialog';
import type { DialogProps } from './Dialog.types';
import { composeComponentWithoutRef } from '../../utils/composeComponent';

/**
 * The `Dialog` root component serves as an interface for all Dialog behaviors.
 * It provides context to compound sub-components: `DialogTrigger`, `DialogSurface`,
 * `DialogHeader`, `DialogTitle`, `DialogBody`, and `DialogActions`.
 *
 * This component uses the native HTML `<dialog>` element (via `DialogSurface`) for
 * built-in focus trapping, backdrop, and accessibility semantics.
 */
export const Dialog: React.FC<DialogProps> = /*#__PURE__*/ composeComponentWithoutRef(
  'Dialog',
  useDialog,
  useDialogContextValues,
  renderDialog,
);
