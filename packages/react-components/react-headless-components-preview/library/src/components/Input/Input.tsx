'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { InputProps } from './Input.types';
import { useInput } from './useInput';
import { renderInput } from './renderInput';

/**
 * An input component for text and other input types.
 */
export const Input: ForwardRefComponent<InputProps> = React.forwardRef((props, ref) => {
  const state = useInput(props, ref);

  return renderInput(state);
});

Input.displayName = 'Input';
