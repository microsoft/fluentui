import * as React from 'react';
import { useCheckbox } from './useCheckbox';
import { renderCheckbox } from './renderCheckbox';
import { useCheckboxStyles } from './useCheckboxStyles';
import type { CheckboxProps } from './Checkbox.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * Checkboxes give people a way to select one or more items from a group,
 * or switch between two mutually exclusive options (checked or unchecked).
 */
export const Checkbox: ForwardRefComponent<CheckboxProps> = React.forwardRef((props, ref) => {
  const state = useCheckbox(props, ref);

  useCheckboxStyles(state);
  return renderCheckbox(state);
});

Checkbox.displayName = 'Checkbox';
