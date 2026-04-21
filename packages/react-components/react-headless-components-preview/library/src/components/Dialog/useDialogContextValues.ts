import * as React from 'react';
import type { DialogContextValue, DialogSurfaceContextValue } from './dialogContext';
import type { DialogContextValues, DialogState } from './Dialog.types';

export const useDialogContextValues = (state: DialogState): DialogContextValues => {
  const { open, modalType, dialogTitleId, isNestedDialog, inertTrapFocus, unmountOnClose, requestOpenChange } = state;

  const dialog: DialogContextValue = React.useMemo(
    () => ({
      open,
      modalType,
      dialogTitleId,
      isNestedDialog,
      inertTrapFocus,
      unmountOnClose,
      requestOpenChange,
    }),
    [open, modalType, dialogTitleId, isNestedDialog, inertTrapFocus, unmountOnClose, requestOpenChange],
  );

  const dialogSurface: DialogSurfaceContextValue = false;

  return { dialog, dialogSurface };
};
