'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import {
  renderListbox,
  useListbox,
  useListboxContextValues,
} from '@fluentui/react-headless-components-preview/combobox';

import type { ListboxProps } from './Listbox.types';
import { useListboxStyles } from './useListboxStyles';

/**
 * A Listbox presents a list of selectable options — standalone, or as a Combobox's popup surface.
 * Windmod Listbox: the headless listbox decorated with the Fluent visual contract (Tailwind v4 +
 * CSS Modules).
 */
export const Listbox: ForwardRefComponent<ListboxProps> = React.forwardRef((props, ref) => {
  const base = useListbox(props, ref);
  const state = useListboxStyles(base);

  const contextValues = useListboxContextValues(state);

  return renderListbox(state, contextValues);
});

Listbox.displayName = 'Listbox';
