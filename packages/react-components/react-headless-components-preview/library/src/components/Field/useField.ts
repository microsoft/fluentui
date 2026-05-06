'use client';

import type * as React from 'react';
import { useFieldBase_unstable } from '@fluentui/react-field';

import type { FieldProps, FieldState } from './Field.types';

/**
 * Returns the state for a Field component, given its props and ref.
 * The returned state can be modified with hooks before being passed to `renderField`.
 */
export const useField = (props: FieldProps, ref: React.Ref<HTMLDivElement>): FieldState => {
  'use no memo';

  const state: FieldState = useFieldBase_unstable(props, ref);

  state.root['data-validate-state'] = state.validationState;

  return state;
};
