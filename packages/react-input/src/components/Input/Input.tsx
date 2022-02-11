import * as React from 'react';
import { useInput_unstable } from './useInput';
import type { InputProps } from './Input.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * The Input component allows people to enter and edit text.
 */
export const Input: ForwardRefComponent<InputProps> = React.forwardRef((props, ref) => {
  const [state, render] = useInput_unstable(props, ref);
  return render(state);
});

Input.displayName = 'Input';
