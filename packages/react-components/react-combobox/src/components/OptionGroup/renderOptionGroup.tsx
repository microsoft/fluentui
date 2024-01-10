/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { OptionGroupState, OptionGroupSlots } from './OptionGroup.types';

/**
 * Render the final JSX of OptionGroup
 */
export const renderOptionGroup_unstable = (state: OptionGroupState) => {
  assertSlots<OptionGroupSlots>(state);

  return (
    <state.root>
      {state.label && <state.label>{state.label.children}</state.label>}
      {state.root.children}
    </state.root>
  );
};
