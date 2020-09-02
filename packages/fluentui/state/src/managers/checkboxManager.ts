import { createManager } from '../createManager';
import { Manager, ManagerConfig } from '../types';

export type CheckboxActions = {
  toggle: (checked: boolean) => void;
};

export type CheckboxState = {
  checked: boolean;
};

export type CheckboxManager = Manager<CheckboxState, CheckboxActions>;

export const createCheckboxManager = (
  config: Partial<ManagerConfig<CheckboxState, CheckboxActions>> = {},
): CheckboxManager =>
  createManager<CheckboxState, CheckboxActions>({
    ...config,
    state: {
      checked: false,
      ...config.state,
    },
    actions: {
      toggle: checked => () => ({ checked }),
      ...config.actions,
    },
  });
