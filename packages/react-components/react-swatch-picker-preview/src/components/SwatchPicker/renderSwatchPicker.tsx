/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { SwatchPickerState, SwatchPickerSlots } from './SwatchPicker.types';

/**
 * Render the final JSX of SwatchPicker
 */
export const renderSwatchPicker_unstable = (state: SwatchPickerState) => {
  assertSlots<SwatchPickerSlots>(state);

  return (
    <state.root>
      <state.row>{state.root.children}</state.row>
    </state.root>
  );
};
