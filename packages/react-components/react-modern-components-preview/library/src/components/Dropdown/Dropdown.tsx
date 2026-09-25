'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { DropdownProps } from './Dropdown.types';
import { renderDropdown } from './renderDropdown';
import { useDropdown, useDropdownContextValues } from './useDropdown';
import { useDropdownStyles } from './useDropdownStyles.styles';

export const Dropdown: ForwardRefComponent<DropdownProps> = React.forwardRef((props, ref) => {
  const state = useDropdown(props, ref);
  const contextValues = useDropdownContextValues(state);
  useDropdownStyles(state);

  return renderDropdown(state, contextValues);
});

Dropdown.displayName = 'Dropdown';
