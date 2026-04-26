'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useCheckbox } from './useCheckbox';
import { renderCheckbox } from './renderCheckbox';
import type { CheckboxProps } from './Checkbox.types';

/**
 * Checkbox component - TODO: add more docs
 */
export const Checkbox: ForwardRefComponent<CheckboxProps> = React.forwardRef((props, ref) => {
  const state = useCheckbox(props, ref);

  return renderCheckbox(state);
});

Checkbox.displayName = 'Checkbox';
