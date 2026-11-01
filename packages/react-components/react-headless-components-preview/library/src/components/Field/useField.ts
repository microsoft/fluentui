'use client';

import type * as React from 'react';
import { useFieldBase_unstable } from '@fluentui/react-field';
import { slot } from '@fluentui/react-utilities';

import type { FieldProps, FieldState } from './Field.types';

/**
 * Returns the state for a Field component, given its props and ref.
 * The returned state can be modified with hooks before being passed to `renderField`.
 */
export const useField = (props: FieldProps, ref: React.Ref<HTMLDivElement>): FieldState => {
  const state = useFieldBase_unstable(props, ref);
  return {
    ...state,
    root: {
      ...state.root,
      'data-validation-state': state.validationState,
    },
    validationMessageIcon: slot.optional(props.validationMessageIcon, {
      defaultProps: { 'aria-hidden': true },
      elementType: 'span',
    }),
  };
};
