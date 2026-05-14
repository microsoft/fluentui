'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { FieldProps } from './Field.types';
import { useField } from './useField';
import { renderField } from './renderField';
import { useFieldContextValues } from './useFieldContextValues';

/**
 * A field component for form input grouping.
 */
export const Field: ForwardRefComponent<FieldProps> = React.forwardRef((props, ref) => {
  const state = useField(props, ref);
  const contextValues = useFieldContextValues(state);

  return renderField(state, contextValues);
});

Field.displayName = 'Field';
