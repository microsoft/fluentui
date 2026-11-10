/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import type { InputBaseState, InputSlots } from './Input.types';

/**
 * Render the final JSX of Input
 */
export const renderInput_unstable = (state: InputBaseState): JSXElement => {
  assertSlots<InputSlots>(state);
  return (
    <state.root>
      {state.contentBefore && <state.contentBefore />}
      <state.input />
      {state.contentAfter && <state.contentAfter />}
    </state.root>
  );
};
