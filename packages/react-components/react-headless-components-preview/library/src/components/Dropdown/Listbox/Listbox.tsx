'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

import { useListbox } from './useListbox';
import { useListboxContextValues } from './useListboxContextValues';
import { renderListbox } from './renderListbox';
import type { ListboxProps } from './Listbox.types';

/**
 * Listbox component: a standalone selection control, or the popup in a Combobox.
 */
export const Listbox: ForwardRefComponent<ListboxProps> = React.forwardRef((props, ref) => {
  const state = useListbox(props, ref);
  const contextValues = useListboxContextValues(state);

  return renderListbox(state, contextValues);
});

Listbox.displayName = 'Listbox';
