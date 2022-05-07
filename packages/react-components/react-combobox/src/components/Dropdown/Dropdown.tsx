import * as React from 'react';
import { useDropdown_unstable } from './useDropdown';
import { renderComboboxBase_unstable } from '../ComboboxBase/renderComboboxBase';
import type { ComboboxBaseState } from '../ComboboxBase/ComboboxBase.types';
import { useComboboxContextValues } from '../../contexts/useComboboxContextValues';
import { useDropdownStyles_unstable } from './useDropdownStyles';
import type { DropdownProps } from './Dropdown.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * Dropdown component - TODO: add more docs
 */
export const Dropdown: ForwardRefComponent<DropdownProps> = React.forwardRef((props, ref) => {
  const state = useDropdown_unstable(props, ref as React.Ref<HTMLButtonElement>);
  const contextValues = useComboboxContextValues(state as ComboboxBaseState);

  useDropdownStyles_unstable(state);
  return renderComboboxBase_unstable(state as ComboboxBaseState, contextValues);
});

Dropdown.displayName = 'Dropdown';
