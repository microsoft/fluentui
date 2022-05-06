import * as React from 'react';
import { useCombobox_unstable } from './useCombobox';
import { renderComboboxBase_unstable } from '../ComboboxBase/renderComboboxBase';
import { useComboboxStyles_unstable } from './useComboboxStyles';
import type { ComboboxProps } from './Combobox.types';
import { useComboboxContextValues } from '../../contexts/useComboboxContextValues';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * Combobox component: a selection control that allows users to choose from a set of possible options
 */
export const Combobox: ForwardRefComponent<ComboboxProps> = React.forwardRef((props, ref) => {
  const state = useCombobox_unstable(props, ref);
  const contextValues = useComboboxContextValues(state);

  useComboboxStyles_unstable(state);
  return renderComboboxBase_unstable(state, contextValues);
});

Combobox.displayName = 'Combobox';
