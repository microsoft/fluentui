/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { SwitchState, SwitchSlots } from './Switch.types';

/**
 * Render a Switch component by passing the state defined props to the appropriate slots.
 */
export const renderSwitch_unstable = (state: SwitchState) => {
  assertSlots<SwitchSlots>(state);
  const { labelPosition } = state;

  return (
    <state.root>
      <state.input />
      {labelPosition !== 'after' && state.label && <state.label />}
      <state.indicator />
      {labelPosition === 'after' && state.label && <state.label />}
    </state.root>
  );
};
