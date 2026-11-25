/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import { SwatchPickerProvider } from '../../contexts/swatchPicker';
import type { SwatchPickerContextValues } from '../../contexts/swatchPicker';
import type { SwatchPickerBaseState, SwatchPickerSlots } from './SwatchPicker.types';

/**
 * Render the final JSX of SwatchPicker
 */
export const renderSwatchPicker_unstable = (
  state: SwatchPickerBaseState,
  contextValues: SwatchPickerContextValues,
): JSXElement => {
  assertSlots<SwatchPickerSlots>(state);

  return (
    <SwatchPickerProvider value={contextValues.swatchPicker}>
      <state.root>{state.root.children}</state.root>
    </SwatchPickerProvider>
  );
};
