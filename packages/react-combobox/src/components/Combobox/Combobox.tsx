import * as React from 'react';
import { useCombobox } from './useCombobox';
import { renderCombobox } from './renderCombobox';
import { useComboboxStyles } from './useComboboxStyles';
import type { ComboboxProps } from './Combobox.types';
import { useComboboxContextValues } from '../../contexts/useComboboxContext';
import { useOptionCollection } from '../../utils/useOptionCollection';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * Combobox component
 */
export const Combobox: ForwardRefComponent<ComboboxProps> = React.forwardRef((props, ref) => {
  const optionCollection = useOptionCollection(props.children);
  const state = useCombobox(props, optionCollection, ref);
  const contextValues = useComboboxContextValues(state);

  useComboboxStyles(state);
  return renderCombobox(state, contextValues);
});

Combobox.displayName = 'Combobox';
