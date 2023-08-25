/** @jsxRuntime classic */
/** @jsx createElement */

import { createElement } from '@fluentui/react-jsx-runtime';
import { getSlotsNext } from '@fluentui/react-utilities';
import { assertSlots } from '@fluentui/react-utilities';
import { SwatchPickerProvider } from './SwatchPickerContext';
import type { SwatchPickerState, SwatchPickerSlots, SwatchPickerContextValues } from './SwatchPicker.types';

/**
 * Render the final JSX of SwatchPicker
 */
export const renderSwatchPicker_unstable = (state: SwatchPickerState, contextValues: SwatchPickerContextValues) => {
  // const { slots, slotProps } = getSlotsNext<SwatchPickerSlots>(state);
  assertSlots<SwatchPickerSlots>(state);

  return (
    <SwatchPickerProvider value={contextValues.swatchPicker}>
      <state.root />
    </SwatchPickerProvider>
    // <SwatchPickerProvider value={contextValues.swatchPicker}>
    //   <slots.root {...slotProps.root} />
    // </SwatchPickerProvider>
  );
};
