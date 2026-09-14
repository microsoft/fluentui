'use client';

import * as React from 'react';
import { useDialog } from './useDialog';
import { useDialogContextValues } from './useDialogContextValues';
import { renderDialog } from './renderDialog';
import type { DialogProps } from './Dialog.types';

/**
 * The `Dialog` root component serves as an interface for all Dialog behaviors.
 * It provides context to compound sub-components: `DialogTrigger`, `DialogSurface`,
 * `DialogHeader`, `DialogTitle`, `DialogBody`, and `DialogActions`.
 *
 * This component uses the native HTML `<dialog>` element (via `DialogSurface`) for
 * built-in focus trapping, backdrop, and accessibility semantics.
 */
export const Dialog: React.FC<DialogProps> = React.memo(props => {
  const state = useDialog(props);
  const contextValues = useDialogContextValues(state);
  return renderDialog(state, contextValues);
});

Dialog.displayName = 'Dialog';
