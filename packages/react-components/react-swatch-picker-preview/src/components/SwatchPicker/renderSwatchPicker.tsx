/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { SwatchPickerState, SwatchPickerSlots } from './SwatchPicker.types';

/**
 * Render the final JSX of SwatchPicker
 */
export const renderSwatchPicker_unstable = (state: SwatchPickerState) => {
  assertSlots<SwatchPickerSlots>(state);

  // TODO Add additional slots in the appropriate place
  return (
    <state.root>
      <state.row>
        <state.swatch>1</state.swatch>
        <state.swatch>2</state.swatch>
        <state.swatch>3</state.swatch>
      </state.row>
      <state.row>
        <state.swatch>4</state.swatch>
        <state.swatch>5</state.swatch>
        <state.swatch>6</state.swatch>
      </state.row>
      <state.row>
        <state.swatch aria-selected="true">7</state.swatch>
        <state.swatch>8</state.swatch>
        <state.swatch>9</state.swatch>
      </state.row>
    </state.root>
  );
};
