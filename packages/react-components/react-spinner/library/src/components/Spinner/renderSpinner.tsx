/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import { mergeClasses } from '@griffel/react';
import type { JSXElement } from '@fluentui/react-utilities';
import type { SpinnerState, SpinnerSlots } from './Spinner.types';
import { SpinnerRotation, SpinnerTailMotion, SpinnerArcStartMotion, SpinnerArcEndMotion } from './spinnerMotions';

/**
 * Render the final JSX of Spinner
 */
export const renderSpinner_unstable = (state: SpinnerState): JSXElement => {
  assertSlots<SpinnerSlots>(state);
  const { labelPosition, shouldRenderSpinner, tailArcClassName, tailArcRtlClassName } = state;
  const arcClassName = mergeClasses(tailArcClassName, tailArcRtlClassName);
  return (
    <state.root>
      {state.label && shouldRenderSpinner && (labelPosition === 'above' || labelPosition === 'before') && (
        <state.label />
      )}
      {state.spinner && shouldRenderSpinner && (
        <SpinnerRotation>
          <state.spinner>
            {state.spinnerTail && (
              <SpinnerTailMotion>
                <state.spinnerTail>
                  <SpinnerArcStartMotion>
                    <span className={arcClassName} />
                  </SpinnerArcStartMotion>
                  <SpinnerArcEndMotion>
                    <span className={arcClassName} />
                  </SpinnerArcEndMotion>
                </state.spinnerTail>
              </SpinnerTailMotion>
            )}
          </state.spinner>
        </SpinnerRotation>
      )}
      {state.label && shouldRenderSpinner && (labelPosition === 'below' || labelPosition === 'after') && (
        <state.label />
      )}
    </state.root>
  );
};
