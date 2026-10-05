/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { ComponentState, JSXElement } from '@fluentui/react-utilities';

import type { SplitButtonBaseSlots } from './SplitButton.types';

/**
 * Renders a SplitButton component by passing the state defined props to the appropriate slots.
 */
export const renderSplitButton_unstable = (
  state: Pick<ComponentState<SplitButtonBaseSlots>, 'root' | 'menuButton' | 'primaryActionButton'>,
): JSXElement => {
  assertSlots<SplitButtonBaseSlots>(state);

  return (
    <state.root>
      {state.primaryActionButton && <state.primaryActionButton />}
      {state.menuButton && <state.menuButton />}
    </state.root>
  );
};
