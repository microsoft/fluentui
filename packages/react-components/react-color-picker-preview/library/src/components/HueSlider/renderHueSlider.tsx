/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { HueSliderState, HueSliderSlots } from './HueSlider.types';

/**
 * Render the final JSX of HueSlider
 */
export const renderHueSlider_unstable = (state: HueSliderState) => {
  assertSlots<HueSliderSlots>(state);

  return (
    <state.root>
      <state.input />
      <state.rail />
      <state.thumb />
    </state.root>
  );
};
