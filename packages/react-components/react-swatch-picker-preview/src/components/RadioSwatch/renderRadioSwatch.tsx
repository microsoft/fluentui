/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { RadioSwatchState, RadioSwatchSlots } from './RadioSwatch.types';

/**
 * Render the final JSX of RadioSwatch
 */
export const renderRadioSwatch_unstable = (state: RadioSwatchState) => {
  assertSlots<RadioSwatchSlots>(state);

  return (
    <state.root>
      <state.input />
      {state.icon && <state.icon />}
      {state.swatch && <state.swatch />}
    </state.root>
  );
};
