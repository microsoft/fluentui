/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { OptionState, OptionSlots } from './Option.types';

/**
 * Render the final JSX of Option
 */
export const renderOption_unstable = (state: OptionState) => {
  assertSlots<OptionSlots>(state);

  return (
    <state.root>
      {state.checkIcon && <state.checkIcon />}
      {state.root.children}
    </state.root>
  );
};
