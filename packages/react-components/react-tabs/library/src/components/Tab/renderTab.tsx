/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */
import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import type { TabBaseState, TabInternalSlots } from './Tab.types';

/**
 * Render the final JSX of Tab
 */
export const renderTab_unstable = (state: TabBaseState): JSXElement => {
  assertSlots<TabInternalSlots>(state);

  return (
    <state.root>
      {state.icon && <state.icon />}
      {!state.iconOnly && <state.content />}
      {state.contentReservedSpace && <state.contentReservedSpace />}
    </state.root>
  );
};
