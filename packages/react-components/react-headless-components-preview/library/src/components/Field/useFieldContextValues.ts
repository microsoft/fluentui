'use client';

import { useFieldContextValues as useFieldContextValuesCore } from '@fluentui/react-core-preview';

import type { FieldState, FieldContextValues } from './Field.types';

export { useFieldContext, useFieldControlProps } from '@fluentui/react-core-preview';

/**
 * Returns the context values for a Field component, given its state.
 */
export const useFieldContextValues = useFieldContextValuesCore as (state: FieldState) => FieldContextValues;
