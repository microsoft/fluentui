import * as React from 'react';
import { useDropdownTrigger } from './useDropdownTrigger';
import { DropdownTriggerProps } from './DropdownTrigger.types';
import { renderDropdownTrigger } from './renderDropdownTrigger';
import { useDropdownTriggerStyles } from './useDropdownTriggerStyles';

/**
 * Define a styled DropdownTrigger, using the `useDropdownTrigger` and `useDropdownTriggerStyles` hook.
 * {@docCategory DropdownTrigger}
 */
export const DropdownTrigger = React.forwardRef<HTMLElement, DropdownTriggerProps>((props, ref) => {
  const state = useDropdownTrigger(props, ref);

  useDropdownTriggerStyles(state);
  return renderDropdownTrigger(state);
});

DropdownTrigger.displayName = 'DropdownTrigger';
