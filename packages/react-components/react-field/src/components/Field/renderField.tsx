/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import { FieldContextProvider, getFieldControlProps } from '../../contexts/index';
import type { FieldContextValues, FieldSlots, FieldState } from './Field.types';

/**
 * Render the final JSX of Field
 */
export const renderField_unstable = (state: FieldState, contextValues: FieldContextValues) => {
  assertSlots<FieldSlots>(state);

  let { children } = state;
  if (typeof children === 'function') {
    children = children(getFieldControlProps(contextValues.field) || {});
  }

  return (
    <FieldContextProvider value={contextValues?.field}>
      <state.root>
        {state.label && <state.label />}
        {children}
        {state.validationMessage && (
          <state.validationMessage>
            {state.validationMessageIcon && <state.validationMessageIcon />}
            {state.validationMessage.children}
          </state.validationMessage>
        )}

        {state.hint && <state.hint />}
      </state.root>
    </FieldContextProvider>
  );
};
