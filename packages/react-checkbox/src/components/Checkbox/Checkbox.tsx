import * as React from 'react';
import { useCheckbox } from './useCheckbox';
import { renderCheckbox } from './renderCheckbox';
import { useCheckboxStyles } from './useCheckboxStyles';
import type { CheckboxProps } from './Checkbox.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * A Checkbox component provides a way to represent options that can be selected
 */
export const Checkbox: ForwardRefComponent<CheckboxProps> = React.forwardRef((props, ref) => {
  const state = useCheckbox(props, ref);

  useCheckboxStyles(state);
  return renderCheckbox(state);
});

Checkbox.displayName = 'Checkbox';
