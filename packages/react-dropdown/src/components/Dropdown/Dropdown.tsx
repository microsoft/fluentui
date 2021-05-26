import * as React from 'react';
import { useDropdown } from './useDropdown';
import { DropdownProps } from './Dropdown.types';
import { renderDropdown } from './renderDropdown';
import { useDropdownStyles } from './useDropdownStyles';

/**
 * Wrapper component that manages state for a popup DropdownList and a DropdownTrigger
 * {@docCategory Dropdown }
 */
export const Dropdown: React.FunctionComponent<DropdownProps & React.RefAttributes<HTMLElement>> = React.forwardRef<
  HTMLElement,
  DropdownProps
>((props, ref) => {
  const state = useDropdown(props, ref);

  useDropdownStyles(state);
  return renderDropdown(state);
});

Dropdown.displayName = 'Dropdown';
