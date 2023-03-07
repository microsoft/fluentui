import * as React from 'react';
import { useDropdown_unstable } from './useDropdown';
import { renderDropdown_unstable } from './renderDropdown';
import { useDropdownStyles_unstable } from './useDropdownStyles';
import type { DropdownProps } from './Dropdown.types';
import { useComboboxContextValues } from '../../contexts/useComboboxContextValues';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useCustomStyleHooks_unstable } from '@fluentui/react-shared-contexts';

/**
 * Dropdown component: a selection control that allows users to choose from a set of possible options
 */
export const Dropdown: ForwardRefComponent<DropdownProps> = React.forwardRef((props, ref) => {
  const state = useDropdown_unstable(props, ref);
  const contextValues = useComboboxContextValues(state);

  useDropdownStyles_unstable(state);

  const { useDropdownStyles_unstable: useCustomStyles } = useCustomStyleHooks_unstable();
  useCustomStyles(state);

  return renderDropdown_unstable(state, contextValues);
});

Dropdown.displayName = 'Dropdown';
