import * as React from 'react';
import { mergeCallbacks, useEventCallback } from '@fluentui/react-utilities';
import type { ExtractSlotProps, Slot } from '@fluentui/react-utilities';
import { ArrowLeft, ArrowRight } from '@fluentui/keyboard-keys';
import { useTriggerSlot } from '../../utils/useTriggerSlot';
import { ComboboxProps, ComboboxState } from './Combobox.types';
import { OptionValue } from '../../utils/OptionCollection.types';
import { getDropdownActionFromKey } from '../../utils/dropdownKeyActions';

type UsedComboboxState = Pick<
  ComboboxState,
  | 'open'
  | 'value'
  | 'activeOption'
  | 'selectOption'
  | 'setValue'
  | 'setActiveOption'
  | 'setFocusVisible'
  | 'multiselect'
  | 'selectedOptions'
  | 'clearSelection'
  | 'getOptionsMatchingText'
  | 'getIndexOfId'
  | 'setOpen'
  | 'getCount'
  | 'getOptionAtIndex'
>;

/*
 * useInputTriggerSlot returns a tuple of trigger/listbox shorthand,
 * with the semantics and event handlers needed for the Combobox and Dropdown components.
 * The element type of the ref should always match the element type used in the trigger shorthand.
 */
export function useInputTriggerSlot(
  props: ComboboxProps,
  state: UsedComboboxState,
  ref: React.Ref<HTMLInputElement>,
  triggerFromProps?: ExtractSlotProps<Slot<'input'>>,
): ExtractSlotProps<Slot<'input'>> {
  const {
    open,
    value,
    activeOption,
    selectOption,
    setValue,
    setActiveOption,
    setFocusVisible,
    multiselect,
    selectedOptions,
    clearSelection,
    getOptionsMatchingText,
    getIndexOfId,
    setOpen,
  } = state;
  const { freeform } = props;

  const onBlur = (ev: React.FocusEvent<HTMLInputElement>) => {
    // handle selection and updating value if freeform is false
    if (!open && !freeform) {
      // select matching option, if the value fully matches
      if (value && activeOption && value.trim().toLowerCase() === activeOption?.text.toLowerCase()) {
        selectOption(ev, activeOption);
      }

      // reset typed value when the input loses focus while collapsed, unless freeform is true
      setValue(undefined);
    }
  };

  const getOptionFromInput = (inputValue: string): OptionValue | undefined => {
    const searchString = inputValue?.trim().toLowerCase();

    if (!searchString || searchString.length === 0) {
      return;
    }

    const matcher = (optionText: string) => optionText.toLowerCase().indexOf(searchString) === 0;
    const matches = getOptionsMatchingText(matcher);

    // return first matching option after the current active option, looping back to the top
    if (matches.length > 1 && activeOption) {
      const startIndex = getIndexOfId(activeOption.id);
      const nextMatch = matches.find(option => getIndexOfId(option.id) >= startIndex);
      return nextMatch ?? matches[0];
    }

    return matches[0] ?? undefined;
  };

  // update value and active option based on input
  const onChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = ev.target.value;
    // update uncontrolled value
    setValue(inputValue);

    // handle updating active option based on input
    const matchingOption = getOptionFromInput(inputValue);
    setActiveOption(matchingOption);

    setFocusVisible(true);

    // clear selection for single-select if the input value no longer matches the selection
    if (!multiselect && selectedOptions.length === 1 && (inputValue.length < 1 || !matchingOption)) {
      clearSelection(ev);
    }
  };

  const trigger = useTriggerSlot(props, state, ref, triggerFromProps);
  trigger.onChange = mergeCallbacks(trigger.onChange, onChange);
  trigger.onBlur = mergeCallbacks(trigger.onBlur, onBlur);

  // NVDA and JAWS have bugs that suppress reading the input value text when aria-activedescendant is set
  // To prevent this, we clear the HTML attribute (but save the state) when a user presses left/right arrows
  // ref: https://github.com/microsoft/fluentui/issues/26359#issuecomment-1397759888
  const [hideActiveDescendant, setHideActiveDescendant] = React.useState(false);
  // save the typing vs. navigating options state, as the space key should behave differently in each case
  // we do not want to update the combobox when this changes, just save the value between renders
  const isTyping = React.useRef(false);

  /**
   * Freeform combobox should not select
   */
  const defaultOnKeyDown = trigger.onKeyDown;
  const onKeyDown = useEventCallback((ev: React.KeyboardEvent<HTMLInputElement>) => {
    if (!open && getDropdownActionFromKey(ev) === 'Type') {
      setOpen(ev, true);
    }

    // clear activedescendant when moving the text insertion cursor
    if (ev.key === ArrowLeft || ev.key === ArrowRight) {
      setHideActiveDescendant(true);
    } else {
      setHideActiveDescendant(false);
    }

    // update typing state to true if the user is typing
    const action = getDropdownActionFromKey(ev, { open, multiselect });
    if (action === 'Type') {
      isTyping.current = true;
    }
    // otherwise, update the typing state to false if opening or navigating dropdown options
    // other actions, like closing the dropdown, should not impact typing state.
    else if (
      (action === 'Open' && ev.key !== ' ') ||
      action === 'Next' ||
      action === 'Previous' ||
      action === 'First' ||
      action === 'Last' ||
      action === 'PageUp' ||
      action === 'PageDown'
    ) {
      isTyping.current = false;
    }

    // allow space to insert a character if freeform & the last action was typing, or if the popup is closed
    if (freeform && (isTyping.current || !open) && ev.key === ' ') {
      triggerFromProps?.onKeyDown?.(ev);
      return;
    }

    defaultOnKeyDown?.(ev);
  });

  trigger.onKeyDown = onKeyDown;

  if (hideActiveDescendant) {
    trigger['aria-activedescendant'] = undefined;
  }

  return trigger;
}
