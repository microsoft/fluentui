/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import { SwatchPickerContextValue, SwatchPickerProvider } from '../../contexts/swatchPicker';
import type { SwatchPickerState, SwatchPickerSlots } from './SwatchPicker.types';

/**
 * Render the final JSX of SwatchPicker
 */
export const renderSwatchPicker_unstable = (state: SwatchPickerState, contextValues: SwatchPickerContextValue) => {
  assertSlots<SwatchPickerSlots>(state);

  return (
    <SwatchPickerProvider value={contextValues}>
      <state.root>{state.root.children}</state.root>
    </SwatchPickerProvider>
  );
};
