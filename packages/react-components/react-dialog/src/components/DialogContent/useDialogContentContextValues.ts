import { DialogContentContextValue } from '../../contexts/dialogContentContext';
import type { DialogContentState, DialogContentContextValues } from './DialogContent.types';

const defaultDialogContentContextValue: DialogContentContextValue = {
  isInsideDialogContent: true,
};

export function useDialogContextValues_unstable(state: DialogContentState): DialogContentContextValues {
  return {
    dialogContent: defaultDialogContentContextValue,
  };
}
