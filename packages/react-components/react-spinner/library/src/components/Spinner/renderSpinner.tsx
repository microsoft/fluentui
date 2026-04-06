/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import * as React from 'react';
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

  // Motion slots can be undefined when a user passes null to disable motion.
  // Fall back to React.Fragment so the JSX structure stays intact without the animation.
  const RotationMotion = state.rotationMotion ?? React.Fragment;
  const TailMotion = state.tailMotion ?? React.Fragment;
  const ArcStartMotion = state.arcStartMotion ?? React.Fragment;
  const ArcEndMotion = state.arcEndMotion ?? React.Fragment;

  return (
    <state.root>
      {state.label && shouldRenderSpinner && (labelPosition === 'above' || labelPosition === 'before') && (
        <state.label />
      )}
      {state.spinner && shouldRenderSpinner && (
        <RotationMotion>
          <state.spinner>
            {state.spinnerTail && (
              <TailMotion>
                <state.spinnerTail>
                  <ArcStartMotion>
                    <span className={arcClassName} />
                  </ArcStartMotion>
                  <ArcEndMotion>
                    <span className={arcClassName} />
                  </ArcEndMotion>
                </state.spinnerTail>
              </TailMotion>
            )}
          </state.spinner>
        </RotationMotion>
      )}
      {state.label && shouldRenderSpinner && (labelPosition === 'below' || labelPosition === 'after') && (
        <state.label />
      )}
    </state.root>
  );
};
