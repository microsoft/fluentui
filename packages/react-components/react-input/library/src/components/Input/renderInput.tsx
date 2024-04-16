/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { InputSlots, InputState } from './Input.types';

/**
 * Render the final JSX of Input
 */
export const renderInput_unstable = (state: InputState) => {
  assertSlots<InputSlots>(state);
  return (
    <state.root>
      {state.contentBefore && <state.contentBefore />}
      <state.input />
      {state.contentAfter && <state.contentAfter />}
    </state.root>
  );
};
