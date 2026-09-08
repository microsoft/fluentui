'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useDropdown } from './useDropdown';
import { renderDropdown } from './renderDropdown';
import type { DropdownProps } from './Dropdown.types';
import { useDropdownContextValues } from './useDropdownContextValues';

/**
 * Dropdown component - TODO: add more docs
 */
export const Dropdown: ForwardRefComponent<DropdownProps> = React.forwardRef((props, ref) => {
  const state = useDropdown(props, ref);
  const contextValues = useDropdownContextValues(state);

  return renderDropdown(state, contextValues);
});

Dropdown.displayName = 'Dropdown';
