import * as React from 'react';
import { useDropdown_unstable } from './useDropdown';
import { renderComboboxBase_unstable } from '../ComboboxBase/renderComboboxBase';
import { useComboboxContextValues } from '../../contexts/useComboboxContextValues';
import { useDropdownStyles_unstable } from './useDropdownStyles';
import type { DropdownProps } from './Dropdown.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * Dropdown component - TODO: add more docs
 */
export const Dropdown: ForwardRefComponent<DropdownProps> = React.forwardRef((props, ref) => {
  const state = useDropdown_unstable(props, ref);
  const contextValues = useComboboxContextValues(state);

  useDropdownStyles_unstable(state);
  return renderComboboxBase_unstable(state, contextValues);
});

Dropdown.displayName = 'Dropdown';
