/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import type { ProgressBarState, ProgressBarSlots } from './ProgressBar.types';
import { ProgressBarIndeterminateMotion } from './progressBarMotions';

/**
 * Render the final JSX of ProgressBar
 */
export const renderProgressBar_unstable = (state: ProgressBarState): JSXElement => {
  assertSlots<ProgressBarSlots>(state);
  return (
    <state.root>
      {state.bar &&
        // If the progress is undefined, render the indeterminate motion.
        // Otherwise, render the bar without motion.
        (state.value === undefined ? (
          <ProgressBarIndeterminateMotion>
            <state.bar />
          </ProgressBarIndeterminateMotion>
        ) : (
          <state.bar />
        ))}
    </state.root>
  );
};
