/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { SpinnerState, SpinnerSlots } from './Spinner.types';

/**
 * Render the final JSX of Spinner
 */
export const renderSpinner_unstable = (state: SpinnerState) => {
  assertSlots<SpinnerSlots>(state);
  const { labelPosition, shouldRenderSpinner } = state;
  return (
    <state.root>
      {state.label && shouldRenderSpinner && (labelPosition === 'above' || labelPosition === 'before') && (
        <state.label />
      )}
      {state.spinner && shouldRenderSpinner && (
        <state.spinner>{state.spinnerTail && <state.spinnerTail />}</state.spinner>
      )}
      {state.label && shouldRenderSpinner && (labelPosition === 'below' || labelPosition === 'after') && (
        <state.label />
      )}
    </state.root>
  );
};
