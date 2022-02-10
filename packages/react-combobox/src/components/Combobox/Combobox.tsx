import * as React from 'react';
import { useCombobox_unstable } from './useCombobox';
import { renderCombobox_unstable } from './renderCombobox';
import { useComboboxStyles_unstable } from './useComboboxStyles';
import type { ComboboxProps } from './Combobox.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * Combobox component
 */
export const Combobox: ForwardRefComponent<ComboboxProps> = React.forwardRef((props, ref) => {
  const state = useCombobox_unstable(props, ref);

  useComboboxStyles_unstable(state);
  return renderCombobox_unstable(state);
});

Combobox.displayName = 'Combobox';
