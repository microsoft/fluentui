'use client';

import type { ForwardRefComponent } from '@fluentui/react-utilities';

import { useSelect } from './useSelect';
import { renderSelect } from './renderSelect';
import type { SelectProps } from './Select.types';
import { composeComponent } from '../../utils/composeComponent';

/**
 * Select component - TODO: add more docs
 */
export const Select: ForwardRefComponent<SelectProps> = /*#__PURE__*/ composeComponent(
  'Select',
  useSelect,
  renderSelect,
);
