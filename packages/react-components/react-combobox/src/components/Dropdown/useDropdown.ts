import * as React from 'react';
import { resolveShorthand } from '@fluentui/react-utilities';
import { useComboboxBase_unstable } from '../ComboboxBase/useComboboxBase';
import type { ComboboxBaseProps } from '../ComboboxBase/ComboboxBase.types';
import { ComboButton } from '../ComboButton/ComboButton';
import type { DropdownProps, DropdownState } from './Dropdown.types';

/**
 * Create the state required to render Combobox.
 *
 * The returned state can be modified with hooks such as useComboboxStyles_unstable,
 * before being passed to renderDropdown_unstable.
 *
 * @param props - props from this instance of Dropdown
 * @param ref - reference to root HTMLElement of Dropdown
 */
export const useDropdown_unstable = (props: DropdownProps, ref: React.Ref<HTMLButtonElement>): DropdownState => {
  // DropdownProps extends ComboboxBaseProps
  // because ComboButton in the input slot extends the intrinsic HTMLButtonElement type
  // however, the Slot type does not establish this relationship, so casting is needed
  const initialState = useComboboxBase_unstable(props as ComboboxBaseProps, ref) as DropdownState;

  const state: DropdownState = {
    ...initialState,
    components: {
      ...initialState.components,
      input: ComboButton,
    },
    input: resolveShorthand(props.input, {
      required: true,
      defaultProps: initialState.input,
    }),
  };

  return state;
};
