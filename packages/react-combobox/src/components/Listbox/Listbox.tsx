import * as React from 'react';
import { useListbox } from './useListbox';
import { renderListbox } from './renderListbox';
import { useListboxStyles } from './useListboxStyles';
import type { ListboxProps } from './Listbox.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * Listbox component
 */
export const Listbox: ForwardRefComponent<ListboxProps> = React.forwardRef((props, ref) => {
  const state = useListbox(props, ref);

  useListboxStyles(state);
  return renderListbox(state);
});

Listbox.displayName = 'Listbox';
