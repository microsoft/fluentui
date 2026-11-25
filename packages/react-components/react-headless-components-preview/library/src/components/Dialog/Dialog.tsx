'use client';

import * as React from 'react';
import { useDialog } from './useDialog';
import { useDialogContextValues } from './useDialogContextValues';
import { renderDialog } from './renderDialog';
import { composeComponentWithoutRef } from '../../utils/composeComponent';
import type { ComponentWithoutRef } from '../../utils/composeComponent';
import type { DialogProps } from './Dialog.types';

/**
 * The `Dialog` root component serves as an interface for all Dialog behaviors.
 * It provides context to compound sub-components: `DialogTrigger`, `DialogSurface`,
 * `DialogHeader`, `DialogTitle`, `DialogBody`, and `DialogActions`.
 *
 * This component uses the native HTML `<dialog>` element (via `DialogSurface`) for
 * built-in focus trapping, backdrop, and accessibility semantics.
 */
export const Dialog: React.MemoExoticComponent<ComponentWithoutRef<DialogProps>> = /*#__PURE__*/ React.memo(
  /*#__PURE__*/ composeComponentWithoutRef('Dialog', useDialog, useDialogContextValues, renderDialog),
);

Dialog.displayName = 'Dialog';
