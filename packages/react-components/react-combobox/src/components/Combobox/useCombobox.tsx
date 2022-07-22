import * as React from 'react';
import { ChevronDownRegular as ChevronDownIcon } from '@fluentui/react-icons';
import { getPartitionedNativeProps, resolveShorthand } from '@fluentui/react-utilities';
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
  const {
    activeOption,
    clearSelection,
    getIndexOfId,
    getOptionsMatchingValue,
    selectOption,
    selectedOptions,
    setActiveOption,
    setOpen,
    setValue,
    value,
  } = baseState;
  const { allowFreeform, multiselect } = props;

  const { primary: triggerNativeProps, root: rootNativeProps } = getPartitionedNativeProps({
    props,
    primarySlotTagName: 'input',
    excludedPropNames: ['children', 'size'],
  });

  // track focused state to conditionally render collapsed listbox
  const [hasFocus, setHasFocus] = React.useState(false);
  const onFocus = (ev: React.FocusEvent<HTMLInputElement>) => {
    setHasFocus(true);

    triggerNativeProps.onFocus?.(ev);
  };

  const getSearchString = (inputValue: string): string => {
    // if there are commas in the value string, take the text after the last comma
    const searchString = inputValue.split(',').pop();

    return searchString?.trim().toLowerCase() || '';
  };

  // set active option and selection based on typing
  const getOptionFromInput = (inputValue: string): OptionValue | null => {
    const searchString = getSearchString(inputValue);

    if (searchString.length === 0) {
      return null;
    }

    const matcher = (optionValue: string) => optionValue.toLowerCase().indexOf(searchString) === 0;
    const matches = getOptionsMatchingValue(matcher);

    // return first matching option after the current active option, looping back to the top
    if (matches.length > 1 && activeOption) {
      const startIndex = getIndexOfId(activeOption.id);
      const nextMatch = matches.find(option => getIndexOfId(option.id) >= startIndex);
      return nextMatch ?? matches[0];
    }

    return matches[0] ?? null;
  };

  /* Handle typed input */

  // reset any typed value when an option is selected
  baseState.selectOption = (ev, optionValue) => {
    setValue(undefined);
    selectOption(ev, optionValue);
  };

  const onBlur = (ev: React.FocusEvent<HTMLInputElement>) => {
    // handle selection and updating value if allowFreeform is false
    if (!baseState.open && !allowFreeform) {
      // select matching option, if the value fully matches
      if (value && activeOption && getSearchString(value) === activeOption?.value.toLowerCase()) {
        baseState.selectOption(ev, activeOption.value);
      }

      // reset typed value when the input loses focus while collapsed, unless allowFreeform is true
      setValue(undefined);
    }

    setHasFocus(false);
    triggerNativeProps.onBlur?.(ev);
  };

  baseState.setOpen = (ev, newState: boolean) => {
    if (!newState && !allowFreeform) {
      setValue(undefined);
    }

    setOpen(ev, newState);
  };

  // update value and active option based on input
  const onChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = ev.target.value;
    // update uncontrolled value
    baseState.setValue(inputValue);

    // handle updating active option based on input
    const matchingOption = getOptionFromInput(inputValue);
    setActiveOption(matchingOption);

    // clear selection for single-select if the input value no longer matches the selection
    if (
      !multiselect &&
      selectedOptions.length === 1 &&
      (inputValue.length < 1 || selectedOptions[0].indexOf(inputValue) !== 0)
    ) {
      clearSelection(ev);
    }

    triggerNativeProps.onChange?.(ev);
  };

  // resolve input and listbox slot props
  const triggerShorthand = resolveShorthand(props.input, {
    required: true,
    defaultProps: {
      type: 'text',
      value: value ?? '',
      ...triggerNativeProps,
      onBlur,
      onChange,
      onFocus,
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
    hasFocus,
    setOpen,
  };

  return state;
};
