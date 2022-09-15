import type { DialogContextValue, DialogSurfaceContextValue } from '../../contexts';
import type { DialogContextValues, DialogState } from './Dialog.types';

export function useDialogContextValues_unstable(state: DialogState): DialogContextValues {
  const { modalType, open, dialogBodyID, dialogRef, dialogTitleID, isNestedDialog, requestOpenChange } = state;

  /**
   * This context is created with "@fluentui/react-context-selector",
   * there is no sense to memoize it
   */
  const dialog: DialogContextValue = {
    open,
    modalType,
    dialogRef,
    dialogBodyID,
    dialogTitleID,
    isNestedDialog,
    requestOpenChange,
  };

  const dialogSurface: DialogSurfaceContextValue = false;

  return { dialog, dialogSurface };
}
