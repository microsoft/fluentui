'use client';

import * as React from 'react';
import type { DialogContextValue, DialogSurfaceContextValue } from '../../contexts';
import type { DialogContextValues, DialogState } from './Dialog.types';

export function useDialogContextValues_unstable(state: DialogState): DialogContextValues {
  const {
    modalType,
    open,
    dialogRef,
    dialogTitleId,
    isNestedDialog,
    inertTrapFocus,
    requestOpenChange,
    modalAttributes,
    triggerAttributes,
    unmountOnClose,
  } = state;

  const dialog = React.useMemo<DialogContextValue>(
    () => ({
      open,
      modalType,
      dialogRef,
      dialogTitleId,
      isNestedDialog,
      inertTrapFocus,
      modalAttributes,
      triggerAttributes,
      unmountOnClose,
      requestOpenChange,
    }),
    [
      open,
      modalType,
      dialogRef,
      dialogTitleId,
      isNestedDialog,
      inertTrapFocus,
      modalAttributes,
      triggerAttributes,
      unmountOnClose,
      requestOpenChange,
    ],
  );

  const dialogSurface: DialogSurfaceContextValue = false;

  return { dialog, dialogSurface };
}
