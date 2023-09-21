/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { SliderState, SliderSlots } from './Slider.types';

/**
 * Render the final JSX of Slider
 */
export const renderSlider_unstable = (state: SliderState) => {
  assertSlots<SliderSlots>(state);

  return (
    <state.root>
      <state.input />
      <state.rail />
      <state.thumb />
    </state.root>
  );
};
