'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { FieldProps } from './Field.types';
import { renderField } from './renderField';
import { useField } from './useField';
import { useFieldContextValues } from './useFieldContextValues';
import { useFieldStyles } from './useFieldStyles.styles';

/**
 * A field provides accessible labeling, validation, and hint text for a form control.
 */
export const Field: ForwardRefComponent<FieldProps> = React.forwardRef((props, ref) => {
  const state = useField(props, ref);
  const contextValues = useFieldContextValues(state);

  useFieldStyles(state);
  return renderField(state, contextValues);
});

Field.displayName = 'Field';
