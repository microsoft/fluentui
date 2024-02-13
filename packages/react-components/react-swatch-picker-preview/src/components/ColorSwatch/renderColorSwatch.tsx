/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { ColorSwatchState, ColorSwatchSlots } from './ColorSwatch.types';
import { SwatchContextValues, SwatchProvider } from '../../contexts/swatch';

/**
 * Render the final JSX of ColorSwatch
 */
export const renderColorSwatch_unstable = (state: ColorSwatchState, contextValues: SwatchContextValues) => {
  assertSlots<ColorSwatchSlots>(state);
  return (
    <SwatchProvider value={contextValues.swatch}>
      <state.root />
    </SwatchProvider>
  );
};
