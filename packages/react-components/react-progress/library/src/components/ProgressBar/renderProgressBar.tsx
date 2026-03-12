/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import type { ProgressBarState, ProgressBarSlots } from './ProgressBar.types';
import { ProgressBarIndeterminate } from './progressBarMotions';

/**
 * Render the final JSX of ProgressBar
 */
export const renderProgressBar_unstable = (state: ProgressBarState): JSXElement => {
  assertSlots<ProgressBarSlots>(state);
  return (
    <state.root>
      {state.bar &&
        (state.value === undefined ? (
          <ProgressBarIndeterminate>
            <state.bar />
          </ProgressBarIndeterminate>
        ) : (
          <state.bar />
        ))}
    </state.root>
  );
};
