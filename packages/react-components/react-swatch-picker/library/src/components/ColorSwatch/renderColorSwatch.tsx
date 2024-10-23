/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { ColorSwatchState, ColorSwatchSlots } from './ColorSwatch.types';

/**
 * Render the final JSX of ColorSwatch
 */
export const renderColorSwatch_unstable = (state: ColorSwatchState) => {
  assertSlots<ColorSwatchSlots>(state);

  return (
    <state.root>
      {state.root.children}
      {state.icon && <state.icon />}
      {state.disabled && state.disabledIcon && <state.disabledIcon />}
    </state.root>
  );
};
