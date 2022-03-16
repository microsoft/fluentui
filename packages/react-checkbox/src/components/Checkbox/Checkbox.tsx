import * as React from 'react';
import { useCheckbox_unstable } from './useCheckbox';
import { renderCheckbox_unstable } from './renderCheckbox';
import { useCheckboxStyles_unstable } from './useCheckboxStyles';
import type { CheckboxProps } from './Checkbox.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * Checkboxes give people a way to select one or more items from a group,
 * or switch between two mutually exclusive options (checked or unchecked).
 */
export const Checkbox: ForwardRefComponent<CheckboxProps> = React.forwardRef((props, ref) => {
  const state = useCheckbox_unstable(props, ref);

  useCheckboxStyles_unstable(state);
  return renderCheckbox_unstable(state);
});

Checkbox.displayName = 'Checkbox';
