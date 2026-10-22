'use client';

import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { FieldProps } from './Field.types';
import { useField } from './useField';
import { renderField } from './renderField';
import { useFieldContextValues } from './useFieldContextValues';
import { composeComponent } from '../../utils/composeComponent';

/**
 * A field component for form input grouping.
 */
export const Field: ForwardRefComponent<FieldProps> = /*#__PURE__*/ composeComponent(
  'Field',
  useField,
  renderField,
  useFieldContextValues,
);
