'use client';

import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useDropdown } from './useDropdown';
import { renderDropdown } from './renderDropdown';
import type { DropdownProps } from './Dropdown.types';
import { useDropdownContextValues } from './useDropdownContextValues';
import { composeComponent } from '../../utils/composeComponent';

/**
 * Dropdown component - TODO: add more docs
 */
export const Dropdown: ForwardRefComponent<DropdownProps> = /*#__PURE__*/ composeComponent(
  'Dropdown',
  useDropdown,
  renderDropdown,
  useDropdownContextValues,
);
