'use client';

import { useFieldContextValues_unstable } from '@fluentui/react-field';

import type { FieldState, FieldContextValues } from './Field.types';

/**
 * Returns the context values for a Field component, given its state.
 */
export const useFieldContextValues = useFieldContextValues_unstable as (state: FieldState) => FieldContextValues;
