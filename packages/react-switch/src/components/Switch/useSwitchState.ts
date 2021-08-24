import type { SwitchState, SwitchCommon } from './Switch.types';

export const useSwitchState = (state: Pick<SwitchState, keyof SwitchCommon | 'as' | 'ref'>) => {
  return state;
};
