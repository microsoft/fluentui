import * as React from 'react';
import { useCheckbox_unstable } from './useCheckbox';
import type { CheckboxProps } from './Checkbox.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * Checkboxes give people a way to select one or more items from a group,
 * or switch between two mutually exclusive options (checked or unchecked).
 */
export const Checkbox: ForwardRefComponent<CheckboxProps> = React.forwardRef((props, ref) => {
  const [state, render] = useCheckbox_unstable(props, ref);
  return render(state);
});

Checkbox.displayName = 'Checkbox';
