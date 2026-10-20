'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { CheckboxProps } from './Checkbox.types';
import { renderCheckbox } from './renderCheckbox';
import { useCheckbox } from './useCheckbox';
import { useCheckboxStyles } from './useCheckboxStyles.styles';

export const Checkbox: ForwardRefComponent<CheckboxProps> = React.forwardRef((props, ref) => {
  const state = useCheckbox(props, ref);

  useCheckboxStyles(state);

  return renderCheckbox(state);
});

Checkbox.displayName = 'Checkbox';
