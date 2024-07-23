import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { FieldProps } from './Field.types';
import { renderField_unstable } from './renderField';
import { useField_unstable } from './useField';
import { useFieldStyles_unstable } from './useFieldStyles.styles';
import { useFieldContextValues_unstable } from '../../contexts/index';

export const Field: ForwardRefComponent<FieldProps> = React.forwardRef((props, ref) => {
  const state = useField_unstable(props, ref);
  useFieldStyles_unstable(state);
  const context = useFieldContextValues_unstable(state);
  return renderField_unstable(state, context);
});

Field.displayName = 'Field';
