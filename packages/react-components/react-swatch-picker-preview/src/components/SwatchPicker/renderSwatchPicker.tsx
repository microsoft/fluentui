/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import { ColorPickerContext, PickerContext } from '../../contexts/picker';
import type { SwatchPickerState, SwatchPickerSlots } from './SwatchPicker.types';

/**
 * Render the final JSX of SwatchPicker
 */
export const renderSwatchPicker_unstable = (state: SwatchPickerState, contextValue: ColorPickerContext) => {
  assertSlots<SwatchPickerSlots>(state);

  return (
    <state.root>
      <PickerContext.Provider value={contextValue}>{state.root.children}</PickerContext.Provider>
    </state.root>
  );
};
