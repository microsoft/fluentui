/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import type { RadioSlots, RadioState } from './Radio.types';

/**
 * Render the final JSX of Radio
 */
export const renderRadio_unstable = (state: RadioState): JSXElement => {
  assertSlots<RadioSlots>(state);

  return (
    <state.root>
      <state.input />
      <state.indicator />
      {state.label && <state.label />}
    </state.root>
  );
};
