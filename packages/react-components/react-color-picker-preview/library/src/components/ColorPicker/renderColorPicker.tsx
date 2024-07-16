/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { ColorPickerState, ColorPickerSlots } from './ColorPicker.types';

/**
 * Render the final JSX of ColorPicker
 */
export const renderColorPicker_unstable = (state: ColorPickerState) => {
  assertSlots<ColorPickerSlots>(state);

  // TODO Add additional slots in the appropriate place
  return <state.root>{state.root.children}</state.root>;
};
