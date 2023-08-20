import type { DialogContextValue, DialogSurfaceContextValue } from '../../contexts';
import type { DialogContextValues, DialogState } from './Dialog.types';

export function useDialogContextValues_unstable(state: DialogState): DialogContextValues {
  const {
    dialogRef,
    dialogTitleId,
    inertTrapFocus,
    isNestedDialog,
    modalAttributes,
    modalType,
    motion,
    open,
    requestOpenChange,
    triggerAttributes,
  } = state;

  /**
   * This context is created with "@fluentui/react-context-selector",
   * there is no sense to memoize it
   */
  const dialog: DialogContextValue = {
    dialogRef,
    dialogTitleId,
    inertTrapFocus,
    isNestedDialog,
    modalAttributes,
    modalType,
    motion,
    open,
    requestOpenChange,
    triggerAttributes,
  };

  const dialogSurface: DialogSurfaceContextValue = false;

  return { dialog, dialogSurface };
}
