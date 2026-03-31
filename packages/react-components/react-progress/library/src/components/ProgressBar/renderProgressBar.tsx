/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import type { ProgressBarBaseState, ProgressBarSlots } from './ProgressBar.types';

/**
 * Render the final JSX of ProgressBar
 */
export const renderProgressBar_unstable = (state: ProgressBarBaseState): JSXElement => {
  assertSlots<ProgressBarSlots>(state);
  return (
    <state.root>
      {state.bar &&
        (state.indeterminateMotion ? (
          <state.indeterminateMotion>
            <state.bar />
          </state.indeterminateMotion>
        ) : (
          <state.bar />
        ))}
    </state.root>
  );
};
