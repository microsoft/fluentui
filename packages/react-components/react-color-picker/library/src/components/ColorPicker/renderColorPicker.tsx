/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import type { ColorPickerState, ColorPickerSlots } from './ColorPicker.types';
import type { ColorPickerContextValues } from '../../contexts/colorPicker';
import { ColorPickerProvider } from '../../contexts/colorPicker';

/**
 * Render the final JSX of ColorPicker
 */
export const renderColorPicker_unstable = (
  state: ColorPickerState,
  contextValues: ColorPickerContextValues,
): JSXElement => {
  assertSlots<ColorPickerSlots>(state);

  return (
    <ColorPickerProvider value={contextValues.colorPicker}>
      <state.root>{state.root.children}</state.root>
    </ColorPickerProvider>
  );
};
