'use client';

import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useCheckbox } from './useCheckbox';
import { renderCheckbox } from './renderCheckbox';
import type { CheckboxProps } from './Checkbox.types';
import { composeComponent } from '../../utils/composeComponent';

/**
 * Checkbox component - TODO: add more docs
 */
export const Checkbox: ForwardRefComponent<CheckboxProps> = /*#__PURE__*/ composeComponent(
  'Checkbox',
  useCheckbox,
  renderCheckbox,
);
