/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import type { RangeSliderState, RangeSliderSlots } from './RangeSlider.types';

/**
 * Render the final JSX of RangeSlider
 */
export const renderRangeSlider_unstable = (state: RangeSliderState): JSXElement => {
  assertSlots<RangeSliderSlots>(state);

  return (
    <state.root>
      <state.rail />
      <state.startThumb>
        <state.startInput />
      </state.startThumb>
      <state.endThumb>
        <state.endInput />
      </state.endThumb>
    </state.root>
  );
};
