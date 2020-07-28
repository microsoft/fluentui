import { createManager } from '../createManager';
import { Manager, ManagerConfig } from '../types';

export type DialogActions = {
  close: () => void;
  open: () => void;
};

export type DialogState = {
  open: boolean;
};

export type DialogManager = Manager<DialogState, DialogActions>;

export const createDialogManager = (config: Partial<ManagerConfig<DialogState, DialogActions>> = {}): DialogManager =>
  createManager<DialogState, DialogActions>({
    ...config,
    state: {
      open: false,
      ...config.state,
    },
    actions: {
      close: () => () => ({ open: false }),
      open: () => () => ({ open: true }),
      ...config.actions,
    },
  });
