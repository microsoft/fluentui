import * as React from 'react';
import { useColorSlider_unstable } from '../ColorSlider/useColorSlider';
import type { AlphaSliderProps, AlphaSliderState } from './AlphaSlider.types';
import { useAlphaSliderState_unstable } from './useAlphaSliderState';

/**
 * Create the state required to render AlphaSlider.
 *
 * The returned state can be modified with hooks such as useAlphaSliderStyles_unstable,
 * before being passed to renderAlphaSlider_unstable.
 *
 * @param props - props from this instance of AlphaSlider
 * @param ref - reference to root HTMLInputElement of AlphaSlider
 */
export const useAlphaSlider_unstable = (
  props: AlphaSliderProps,
  ref: React.Ref<HTMLInputElement>,
): AlphaSliderState => {
  const state: AlphaSliderState = {
    ...useColorSlider_unstable(props, ref),
  };

  useAlphaSliderState_unstable(state, props);

  return state;
};
