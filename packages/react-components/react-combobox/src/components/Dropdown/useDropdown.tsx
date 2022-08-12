import * as React from 'react';
import { ChevronDownRegular as ChevronDownIcon } from '@fluentui/react-icons';
import { getPartitionedNativeProps, resolveShorthand } from '@fluentui/react-utilities';
import { useComboboxBaseState } from '../../utils/useComboboxBaseState';
import { useTriggerListboxSlots } from '../../utils/useTriggerListboxSlots';
import { useComboboxPopup } from '../../utils/useComboboxPopup';
import { Listbox } from '../Listbox/Listbox';
import type { Slot } from '@fluentui/react-utilities';
import type { DropdownProps, DropdownState } from './Dropdown.types';

/**
 * Create the state required to render Dropdown.
 *
 * The returned state can be modified with hooks such as useDropdownStyles_unstable,
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

  // resolve button and listbox slot props
  let triggerSlot: Slot<'button'>;
  let listboxSlot: Slot<typeof Listbox>;

  triggerSlot = resolveShorthand(props.button, {
    required: true,
    defaultProps: {
      type: 'button',
      children: baseState.value || props.placeholder,
      ...triggerNativeProps,
    },
  });

  listboxSlot = resolveShorthand(props.listbox, { required: true });

  const [triggerWithPopup, listboxWithPopup] = useComboboxPopup(props, triggerSlot, listboxSlot);
  [triggerSlot, listboxSlot] = useTriggerListboxSlots(props, baseState, ref, triggerWithPopup, listboxWithPopup);

  const state: DropdownState = {
    components: {
      root: 'div',
      button: 'button',
      expandIcon: 'span',
      listbox: Listbox,
    },
    root: resolveShorthand(props.root, {
      required: true,
      defaultProps: {
        children: props.children,
        ...rootNativeProps,
      },
    }),
    button: triggerSlot,
    listbox: listboxSlot,
    expandIcon: resolveShorthand(props.expandIcon, {
      required: true,
      defaultProps: {
        children: <ChevronDownIcon />,
      },
    }),
    placeholderVisible: !baseState.value && !!props.placeholder,
    ...baseState,
  };

  return state;
};
