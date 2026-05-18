'use client';

import type * as React from 'react';
import { useListbox_unstable } from '@fluentui/react-combobox';

import type { ListboxProps, ListboxState } from './Listbox.types';

/**
 * Returns the state for a Listbox component, given its props and ref.
 * The returned state can be modified with hooks before being passed to `renderListbox`.
 */
export const useListbox = (props: ListboxProps, ref: React.Ref<HTMLElement>): ListboxState => {
  'use no memo';

  const state = useListbox_unstable(props, ref);

  state.root.popover = 'auto';

  return state;
};
