import * as React from 'react';
import { ChevronDownRegular as ChevronDownIcon } from '@fluentui/react-icons';
import { getPartitionedNativeProps, resolveShorthand } from '@fluentui/react-utilities';
import { useComboboxBaseSlots } from '../../ComboboxBase/useComboboxBaseSlots';
import { useComboboxBaseState } from '../../ComboboxBase/useComboboxBaseState';
import { useComboboxPopup } from '../../utils/useComboboxPopup';
import { Listbox } from '../Listbox/Listbox';
import type { ComboboxProps, ComboboxState } from './Combobox.types';

/**
 * Create the state required to render Combobox.
 *
 * The returned state can be modified with hooks such as useComboboxStyles_unstable,
 * before being passed to renderCombobox_unstable.
 *
 * @param props - props from this instance of Combobox
 * @param ref - reference to root HTMLElement of Combobox
 */
export const useCombobox_unstable = (props: ComboboxProps, ref: React.Ref<HTMLInputElement>): ComboboxState => {
  const baseState = useComboboxBaseState(props);

  const { primary: triggerNativeProps, root: rootNativeProps } = getPartitionedNativeProps({
    props,
    primarySlotTagName: 'input',
    excludedPropNames: ['children', 'size'],
  });

  const state: ComboboxState = {
    components: {
      root: 'div',
      expandIcon: 'span',
      input: 'input',
      listbox: Listbox,
    },
    root: resolveShorthand(props.root, {
      required: true,
      defaultProps: {
        children: props.children,
        ...rootNativeProps,
      },
    }),
    expandIcon: resolveShorthand(props.expandIcon, {
      defaultProps: {
        children: <ChevronDownIcon />,
      },
    }),
    input: resolveShorthand(props.input, {
      required: true,
      defaultProps: triggerNativeProps,
    }),
    listbox: resolveShorthand(props.listbox, {
      required: true,
    }),
    ...baseState,
  };

  useComboboxBaseSlots(props, state);
  useComboboxPopup(props, state);

  return state;
};
