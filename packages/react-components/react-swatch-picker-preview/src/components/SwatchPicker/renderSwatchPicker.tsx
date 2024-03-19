/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import { SwatchPickerProvider } from '../../contexts/swatchPicker';
import type { SwatchPickerContextValues } from '../../contexts/swatchPicker';
import type { SwatchPickerState, SwatchPickerSlots } from './SwatchPicker.types';

/**
 * Render the final JSX of SwatchPicker
 */
export const renderSwatchPicker_unstable = (state: SwatchPickerState, contextValues: SwatchPickerContextValues) => {
  assertSlots<SwatchPickerSlots>(state);

  return (
    <SwatchPickerProvider value={contextValues.swatchPicker}>
      <state.root>{state.root.children}</state.root>
    </SwatchPickerProvider>
  );
};
