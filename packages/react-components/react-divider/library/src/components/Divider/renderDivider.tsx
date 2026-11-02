/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import type { DividerSlots, DividerBaseState } from './Divider.types';

/**
 * Renders a Divider component by passing the slot props (defined in `state`) to the appropriate slots.
 */
export const renderDivider_unstable = (state: DividerBaseState): JSXElement => {
  assertSlots<DividerSlots>(state);
  return (
    <state.root>{state.root.children !== undefined && <state.wrapper>{state.root.children}</state.wrapper>}</state.root>
  );
};
