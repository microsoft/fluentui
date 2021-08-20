import { SwitchSlots, SwitchState, SwitchCommon } from './Switch.types';

export const useSwitchState = (state: Pick<SwitchState, keyof SwitchCommon | keyof SwitchSlots | 'as' | 'ref'>) => {
  return state;
};
