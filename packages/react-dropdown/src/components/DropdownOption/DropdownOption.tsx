import * as React from 'react';
import { useDropdownOption } from './useDropdownOption';
import { DropdownOptionProps } from './DropdownOption.types';
import { renderDropdownOption } from './renderDropdownOption';
import { useDropdownOptionStyles } from './useDropdownOptionStyles';

/**
 * Define a styled DropdownOption, using the `useDropdownOption` and `useDropdownOptionStyles` hook.
 * {@docCategory DropdownOption}
 */
export const DropdownOption = React.forwardRef<HTMLElement, DropdownOptionProps>((props, ref) => {
  const state = useDropdownOption(props, ref);

  useDropdownOptionStyles(state);
  return renderDropdownOption(state);
});

DropdownOption.displayName = 'DropdownOption';
