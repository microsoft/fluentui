import * as React from 'react';
import { useField_unstable } from './useField';
import { renderField_unstable } from './renderField';
import { useFieldStyles_unstable } from './useFieldStyles';
import type { FieldProps } from './Field.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * Field component - TODO: add more docs
 */
export const Field: ForwardRefComponent<FieldProps> = React.forwardRef((props, ref) => {
  const state = useField_unstable(props, ref);

  useFieldStyles_unstable(state);
  return renderField_unstable(state);
});

Field.displayName = 'Field';
