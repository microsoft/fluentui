/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import { DividerSlots, DividerState } from './Divider.types';

/**
 * Renders a Divider component by passing the slot props (defined in `state`) to the appropriate slots.
 */
export const renderDivider_unstable = (state: DividerState) => {
  assertSlots<DividerSlots>(state);
  return (
    <state.root>{state.root.children !== undefined && <state.wrapper>{state.root.children}</state.wrapper>}</state.root>
  );
};
