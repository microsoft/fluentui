/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import { CheckboxState, CheckboxSlots } from './Checkbox.types';

export const renderCheckbox_unstable = (state: CheckboxState): JSXElement => {
  assertSlots<CheckboxSlots>(state);

  return (
    <state.root>
      <state.input />
      {state.labelPosition === 'before' && state.label && <state.label />}
      {state.indicator && <state.indicator />}
      {state.labelPosition === 'after' && state.label && <state.label />}
    </state.root>
  );
};
