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
  } = state;

  /**
   * This context is created with "@fluentui/react-context-selector",
   * there is no sense to memoize it
   */
  const dialog: DialogContextValue = {
    open,
    modalType,
    dialogRef,
    dialogTitleId,
    isNestedDialog,
    inertTrapFocus,
    modalAttributes,
    triggerAttributes,
    requestOpenChange,
  };

  const dialogSurface: DialogSurfaceContextValue = false;

  return { dialog, dialogSurface };
}
