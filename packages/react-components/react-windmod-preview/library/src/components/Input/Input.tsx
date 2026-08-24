'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { renderInput, useInput } from '@fluentui/react-headless-components-preview/input';
import { useFieldContext } from '@fluentui/react-headless-components-preview/field';

import { mergeContextProps } from '../../utils/mergeContextProps';
import type { InputProps, InputState } from './Input.types';
import { useInputStyles } from './useInputStyles';

/**
 * An Input lets people enter and edit a single line of text. Windmod Input: the headless input
 * decorated with the Fluent visual contract (Tailwind v4 + CSS Modules).
 */
export const Input: ForwardRefComponent<InputProps> = React.forwardRef((props, ref) => {
  // Look props belong to windmod — the headless hook neither accepts nor resolves them.
  // Defaults mirror @fluentui/react-input's styled useInput, including its Field-context size
  // fallback: `size = fieldContext?.size ?? 'medium'` (react-input useInput.ts:20, 23). Only the
  // look half of FieldContext is read here — its aria half is already applied by the headless base
  // hook via useFieldControlProps, so folding the whole value in would double-apply it.
  // The overrides-context appearance fallback stays out: windmod ships no counterpart for it.
  const {
    appearance = 'outline',
    size = 'medium',
    ...rest
  } = mergeContextProps({ size: useFieldContext()?.size }, props);

  const state: InputState = {
    ...useInput(rest, ref),
    appearance,
    size,
  };

  return renderInput(useInputStyles(state));
  // Casting is required due to lack of distributive union to support union on @types/react
}) as ForwardRefComponent<InputProps>;

Input.displayName = 'Input';
