import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { FieldProps } from './Field.types';
import { useField_unstable } from './useField';
import { renderField_unstable } from './renderField';
import { useFieldStyles_unstable } from './useFieldStyles';
import { useFieldContextValues } from '../../contexts/useFieldContextValues';

/**
 * Field component - TODO: add more docs
 */
export const Field: ForwardRefComponent<FieldProps> = React.forwardRef((props, ref) => {
  const state = useField_unstable(props, ref);
  const contextValues = useFieldContextValues(state);

  useFieldStyles_unstable(state);
  return renderField_unstable(state, contextValues);
});

Field.displayName = 'Field';
