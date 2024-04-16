/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { LabelState, LabelSlots } from './Label.types';

/**
 * Render the final JSX of Label
 */
export const renderLabel_unstable = (state: LabelState) => {
  assertSlots<LabelSlots>(state);

  return (
    <state.root>
      {state.root.children}
      {state.required && <state.required />}
    </state.root>
  );
};
