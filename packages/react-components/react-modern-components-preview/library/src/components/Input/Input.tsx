'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { renderInput } from './renderInput';
import type { InputProps } from './Input.types';
import { useInput } from './useInput';
import { useInputStyles } from './useInputStyles.styles';

/**
 * Input allows users to enter and edit text.
 */
export const Input: ForwardRefComponent<InputProps> = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const state = useInput(props, ref);
  useInputStyles(state);
  return renderInput(state);
});

Input.displayName = 'Input';
