/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { SpinButtonState, SpinButtonSlots } from './SpinButton.types';

/**
 * Render the final JSX of SpinButton
 */
export const renderSpinButton_unstable = (state: SpinButtonState) => {
  assertSlots<SpinButtonSlots>(state);

  return (
    <state.root>
      <state.input />
      <state.incrementButton />
      <state.decrementButton />
    </state.root>
  );
};
