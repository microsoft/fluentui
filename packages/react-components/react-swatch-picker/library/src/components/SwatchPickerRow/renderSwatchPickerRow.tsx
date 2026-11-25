/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import type { SwatchPickerRowBaseState, SwatchPickerRowSlots } from './SwatchPickerRow.types';

/**
 * Render the final JSX of SwatchPickerRow
 */
export const renderSwatchPickerRow_unstable = (state: SwatchPickerRowBaseState): JSXElement => {
  assertSlots<SwatchPickerRowSlots>(state);
  return <state.root />;
};
