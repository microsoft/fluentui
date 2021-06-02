import * as React from 'react';
import { useSelect } from './useSelect';
import { SelectProps } from './Select.types';
import { renderSelect } from './renderSelect';
import { useSelectStyles } from './useSelectStyles';

/**
 * Define a styled Select, using the `useSelect` and `useSelectStyles` hook.
 * {@docCategory Select}
 */
export const Select = React.forwardRef<HTMLElement, SelectProps>((props, ref) => {
  const state = useSelect(props, ref);

  useSelectStyles(state);
  return renderSelect(state);
});

Select.displayName = 'Select';
