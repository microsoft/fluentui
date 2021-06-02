import * as React from 'react';
import { useCombobox } from './useCombobox';
import { ComboboxProps } from './Combobox.types';
import { renderCombobox } from './renderCombobox';
import { useComboboxStyles } from './useComboboxStyles';

/**
 * Define a styled Combobox, using the `useCombobox` and `useComboboxStyles` hook.
 * {@docCategory Combobox}
 */
export const Combobox = React.forwardRef<HTMLElement, ComboboxProps>((props, ref) => {
  const state = useCombobox(props, ref);

  useComboboxStyles(state);
  return renderCombobox(state);
});

Combobox.displayName = 'Combobox';
