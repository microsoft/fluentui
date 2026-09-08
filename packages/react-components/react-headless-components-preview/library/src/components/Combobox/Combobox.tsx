'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useCombobox } from './useCombobox';
import { renderCombobox } from './renderCombobox';
import type { ComboboxProps } from './Combobox.types';
import { useComboboxContextValues } from './useComboboxContextValues';

export const Combobox: ForwardRefComponent<ComboboxProps> = React.forwardRef((props, ref) => {
  const state = useCombobox(props, ref as React.Ref<HTMLInputElement>);
  const contextValues = useComboboxContextValues(state);

  return renderCombobox(state, contextValues);
});

Combobox.displayName = 'Combobox';
