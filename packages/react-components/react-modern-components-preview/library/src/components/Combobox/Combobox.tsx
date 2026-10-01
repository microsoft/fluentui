'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { ComboboxProps } from './Combobox.types';
import { renderCombobox } from './renderCombobox';
import { useCombobox, useComboboxContextValues } from './useCombobox';
import { useComboboxStyles } from './useComboboxStyles.styles';

export const Combobox: ForwardRefComponent<ComboboxProps> = React.forwardRef((props, ref) => {
  const state = useCombobox(props, ref);
  const contextValues = useComboboxContextValues(state);
  useComboboxStyles(state);

  return renderCombobox(state, contextValues);
});

Combobox.displayName = 'Combobox';
