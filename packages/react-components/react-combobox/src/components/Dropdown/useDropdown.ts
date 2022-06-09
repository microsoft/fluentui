import * as React from 'react';
import { getPartitionedNativeProps, resolveShorthand } from '@fluentui/react-utilities';
import { useComboboxBaseSlots } from '../../ComboboxBase/useComboboxBaseSlots';
import { useComboboxBaseState } from '../../ComboboxBase/useComboboxBaseState';
import { useComboboxPopup } from '../../utils/useComboboxPopup';
import { Listbox } from '../Listbox/Listbox';
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
  const baseState = useComboboxBaseState(props);

  const { primary: triggerNativeProps, root: rootNativeProps } = getPartitionedNativeProps({
    props,
    primarySlotTagName: 'button',
    excludedPropNames: ['children'],
  });

  const state: DropdownState = {
    components: {
      root: 'div',
      listbox: Listbox,
      button: 'button',
    },
    root: resolveShorthand(props.root, {
      required: true,
      defaultProps: {
        children: props.children,
        ...rootNativeProps,
      },
    }),
    listbox: resolveShorthand(props.listbox, {
      required: true,
    }),
    button: resolveShorthand(props.button, {
      required: true,
      defaultProps: triggerNativeProps,
    }),
    ...baseState,
  };

  useComboboxBaseSlots(props, state);
  useComboboxPopup(props, state);

  return state;
};
