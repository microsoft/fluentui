import type { DialogContextValue, DialogSurfaceContextValue } from './dialogContext';
import type { DialogContextValues, DialogState } from './Dialog.types';

export const useDialogContextValues = (state: DialogState): DialogContextValues => {
  const dialog: DialogContextValue = {
    open: state.open,
    modalType: state.modalType,
    dialogTitleId: state.dialogTitleId,
    isNestedDialog: state.isNestedDialog,
    inertTrapFocus: state.inertTrapFocus,
    unmountOnClose: state.unmountOnClose,
    requestOpenChange: state.requestOpenChange,
  };

  const dialogSurface: DialogSurfaceContextValue = false;

  return { dialog, dialogSurface };
};
