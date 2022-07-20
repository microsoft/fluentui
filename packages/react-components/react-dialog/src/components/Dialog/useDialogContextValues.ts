import { DialogContextValue } from '../../contexts/dialogContext';
import type { DialogContextValues, DialogState } from './Dialog.types';

export function useDialogContextValues_unstable(state: DialogState): DialogContextValues {
  const { modalType, open, requestOpenChange, triggerRef, contentRef } = state;

  /**
   * This context is created with "@fluentui/react-context-selector",
   * there is no sense to memoize it
   */
  const dialog: DialogContextValue = {
    modalType,
    open,
    requestOpenChange,
    triggerRef,
    contentRef,
  };

  return { dialog };
}
