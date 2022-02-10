import * as React from 'react';
import { useListbox_unstable } from './useListbox';
import { renderListbox_unstable } from './renderListbox';
import { useListboxStyles_unstable } from './useListboxStyles';
import type { ListboxProps } from './Listbox.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * Listbox component
 */
export const Listbox: ForwardRefComponent<ListboxProps> = React.forwardRef((props, ref) => {
  const state = useListbox_unstable(props, ref);

  useListboxStyles_unstable(state);
  return renderListbox_unstable(state);
});

Listbox.displayName = 'Listbox';
