import * as React from 'react';
import { useInput_unstable } from './useInput';
import { renderInput_unstable } from './renderInput';
import { useInputStyles_unstable } from './useInputStyles.styles';
import type { InputProps } from './Input.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';

/**
 * The Input component allows people to enter and edit text.
 */
//TODO: migrate to fc to ensure v18 compatibility
// eslint-disable-next-line deprecation/deprecation
export const Input: ForwardRefComponent<InputProps> = React.forwardRef((props, ref) => {
  const state = useInput_unstable(props, ref);

  useInputStyles_unstable(state);

  useCustomStyleHook_unstable('useInputStyles_unstable')(state);

  return renderInput_unstable(state);
});

Input.displayName = 'Input';
