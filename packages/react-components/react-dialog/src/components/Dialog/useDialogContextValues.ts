import { DialogContextValue } from '../../contexts/dialogContext';
import type { DialogContextValues, DialogState } from './Dialog.types';

export function useDialogContextValues_unstable(state: DialogState): DialogContextValues {
  const { type, open, requestOpenChange } = state;

  // This context is created with "@fluentui/react-context-selector", these is no sense to memoize it
  const dialog: DialogContextValue = {
    type,
    open,
    requestOpenChange,
  };

  return { dialog };
}
