/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import type { ColorSliderState, ColorSliderSlots } from './ColorSlider.types';

/**
 * Render the final JSX of ColorSlider
 */
export const renderColorSlider_unstable = (state: ColorSliderState): JSXElement => {
  assertSlots<ColorSliderSlots>(state);

  return (
    <state.root>
      <state.input />
      <state.rail />
      <state.thumb />
    </state.root>
  );
};
