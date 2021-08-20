import * as React from 'react';
import { SwitchProps, SwitchSlots, SwitchState } from './Switch.types';
import { useSwitchState } from './useSwitchState';

/**
 * Array of all shorthand properties listed in SwitchShorthandProps
 */
export const switchShorthandProps: Array<keyof SwitchSlots> = [];

/**
 * Given user props, returns state and render function for a Switch.
 */
export const useSwitch = (props: SwitchProps, ref: React.Ref<HTMLElement>): SwitchState => {
  const state: SwitchState = {
    ref,
    ...props,
  };

  useSwitchState(state);

  return state;
};
