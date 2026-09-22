'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { ListboxProps } from './Listbox.types';
import { renderListbox } from './renderListbox';
import { useListbox, useListboxContextValues } from './useListbox';
import { useListboxStyles } from './useListboxStyles.styles';

export const Listbox: ForwardRefComponent<ListboxProps> = React.forwardRef((props, ref) => {
  const state = useListbox(props, ref);
  const contextValues = useListboxContextValues(state);
  useListboxStyles(state);

  return renderListbox(state, contextValues);
});

Listbox.displayName = 'Listbox';
