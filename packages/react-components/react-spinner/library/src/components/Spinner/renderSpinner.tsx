/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import { mergeClasses } from '@griffel/react';
import type { JSXElement } from '@fluentui/react-utilities';
import type { SpinnerBaseState, SpinnerSlots } from './Spinner.types';

/**
 * Render the final JSX of Spinner
 */
export const renderSpinner_unstable = (state: SpinnerBaseState): JSXElement => {
  assertSlots<SpinnerSlots>(state);
  const { labelPosition, shouldRenderSpinner, tailArcClassName, tailArcRtlClassName } = state;
  const arcClassName = mergeClasses(tailArcClassName, tailArcRtlClassName);
  return (
    <state.root>
      {state.label && shouldRenderSpinner && (labelPosition === 'above' || labelPosition === 'before') && (
        <state.label />
      )}
      {state.spinner && shouldRenderSpinner && (
        <state.rotationMotion>
          <state.spinner>
            {state.spinnerTail && (
              <state.tailMotion>
                <state.spinnerTail>
                  <state.arcStartMotion>
                    <span className={arcClassName} />
                  </state.arcStartMotion>
                  <state.arcEndMotion>
                    <span className={arcClassName} />
                  </state.arcEndMotion>
                </state.spinnerTail>
              </state.tailMotion>
            )}
          </state.spinner>
        </state.rotationMotion>
      )}
      {state.label && shouldRenderSpinner && (labelPosition === 'below' || labelPosition === 'after') && (
        <state.label />
      )}
    </state.root>
  );
};
