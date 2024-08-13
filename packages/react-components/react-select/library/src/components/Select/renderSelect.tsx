/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { SelectSlots, SelectState } from './Select.types';

/**
 * Render the final JSX of Select
 */
export const renderSelect_unstable = (state: SelectState) => {
  assertSlots<SelectSlots>(state);
  return (
    <state.root>
      <state.select>{state.select.children}</state.select>
      <state.icon />
    </state.root>
  );
};
