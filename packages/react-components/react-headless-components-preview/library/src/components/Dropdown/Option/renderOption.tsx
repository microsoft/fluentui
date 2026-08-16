/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import type { OptionState, OptionSlots } from './Option.types';

/**
 * Render the final JSX of Option
 */
export const renderOption = (state: OptionState): JSXElement => {
  assertSlots<OptionSlots>(state);

  return (
    <state.root>
      {state.root.children}
      {state.checkIcon && <state.checkIcon />}
    </state.root>
  );
};
