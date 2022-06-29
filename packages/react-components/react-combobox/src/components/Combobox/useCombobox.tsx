import * as React from 'react';
import { ChevronDownRegular as ChevronDownIcon } from '@fluentui/react-icons';
import { getPartitionedNativeProps, resolveShorthand, useMergedEventCallbacks } from '@fluentui/react-utilities';
import { useComboboxBaseState } from '../../utils/useComboboxBaseState';
import type { OptionValue } from '../../utils/OptionCollection.types';
import { useTriggerListboxSlots } from '../../utils/useTriggerListboxSlots';
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
  const { getOptionsMatchingValue, selectOption, setActiveOption, setValue, value } = baseState;

  const { primary: triggerNativeProps, root: rootNativeProps } = getPartitionedNativeProps({
    props,
    primarySlotTagName: 'input',
    excludedPropNames: ['children', 'size'],
  });

  // set active option and selection based on typing
  const getOptionFromInput = (value: string): OptionValue | null => {
    // if there are commas in the value string, take the text after the last comma
    const searchString = value.split(',').pop();

    if (!searchString || searchString.trim().length === 0) {
      return null;
    }

    const matcher = (optionValue: string) => optionValue.toLowerCase().indexOf(searchString.trim().toLowerCase()) === 0;
    return getOptionsMatchingValue(matcher)[0] ?? null;
  };

  /* Handle typed input */

  // reset any typed value when an option is selected
  baseState.selectOption = useMergedEventCallbacks(selectOption, () => {
    setValue(undefined);
  });

  // reset typed value when the input loses focus
  const onBlur = useMergedEventCallbacks(triggerNativeProps.onBlur, () => {
    setValue(undefined);
  });

  const onInput = useMergedEventCallbacks(triggerNativeProps.onInput, (ev: React.KeyboardEvent<HTMLInputElement>) => {
    const inputValue = (ev.target as HTMLInputElement).value;
    // update uncontrolled value
    baseState.setValue(inputValue);

    // handle updating active option based on input
    const matchingOption = getOptionFromInput(inputValue);
    matchingOption && setActiveOption(matchingOption);
  });

  // resolve input and listbox slot props
  const triggerShorthand = resolveShorthand(props.input, {
    required: true,
    defaultProps: {
      type: 'text',
      value,
      ...triggerNativeProps,
      onBlur,
      onInput,
    },
  });

  const listboxShorthand = resolveShorthand(props.listbox, { required: true });

  const [triggerWithPopup, listboxWithPopup] = useComboboxPopup(props, triggerShorthand, listboxShorthand);
  const [triggerSlot, listboxSlot] = useTriggerListboxSlots(props, baseState, ref, triggerWithPopup, listboxWithPopup);

  const state: ComboboxState = {
    components: {
      root: 'div',
      input: 'input',
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
    input: triggerSlot,
    listbox: listboxSlot,
    expandIcon: resolveShorthand(props.expandIcon, {
      required: true,
      defaultProps: {
        children: <ChevronDownIcon />,
      },
    }),
    ...baseState,
  };

  return state;
};
