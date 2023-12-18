import * as React from 'react';
import { useTimeout, mergeCallbacks } from '@fluentui/react-utilities';
import type { Slot, ExtractSlotProps } from '@fluentui/react-utilities';
import { useTriggerSlot, UseTriggerSlotState } from '../../utils/useTriggerSlot';
import { OptionValue } from '../../utils/OptionCollection.types';
import { getDropdownActionFromKey } from '../../utils/dropdownKeyActions';
import { DropdownState } from './Dropdown.types';

type UsedDropdownState = UseTriggerSlotState & Pick<DropdownState, 'getOptionsMatchingText'>;

/*
 * useButtonTriggerSlot returns a tuple of trigger/listbox shorthand,
 * with the semantics and event handlers needed for the Combobox and Dropdown components.
 * The element type of the ref should always match the element type used in the trigger shorthand.
 */
export function useButtonTriggerSlot(
  state: UsedDropdownState,
  triggerFromProps?: ExtractSlotProps<Slot<'button'>>,
): ExtractSlotProps<Slot<'button'>> {
  const { open, activeOption, setOpen, getOptionsMatchingText, getIndexOfId, setActiveOption, setFocusVisible } = state;

  // jump to matching option based on typing
  const searchString = React.useRef('');
  const [setKeyTimeout, clearKeyTimeout] = useTimeout();

  const getNextMatchingOption = (): OptionValue | undefined => {
    // first check for matches for the full searchString
    let matcher = (optionText: string) => optionText.toLowerCase().indexOf(searchString.current) === 0;
    let matches = getOptionsMatchingText(matcher);
    let startIndex = activeOption ? getIndexOfId(activeOption.id) : 0;

    // if the dropdown is already open and the searchstring is a single character,
    // then look after the current activeOption for letters
    // this is so slowly typing the same letter will cycle through matches
    if (open && searchString.current.length === 1) {
      startIndex++;
    }

    // if there are no direct matches, check if the search is all the same letter, e.g. "aaa"
    if (!matches.length) {
      const letters = searchString.current.split('');
      const allSameLetter = letters.length && letters.every(letter => letter === letters[0]);

      // if the search is all the same letter, cycle through options starting with that letter
      if (allSameLetter) {
        startIndex++;
        matcher = (optionText: string) => optionText.toLowerCase().indexOf(letters[0]) === 0;
        matches = getOptionsMatchingText(matcher);
      }
    }

    // if there is an active option and multiple matches,
    // return first matching option after the current active option, looping back to the top
    if (matches.length > 1 && activeOption) {
      const nextMatch = matches.find(option => getIndexOfId(option.id) >= startIndex);
      return nextMatch ?? matches[0];
    }

    return matches[0] ?? undefined;
  };

  const onTriggerKeyDown = (ev: React.KeyboardEvent<HTMLButtonElement>) => {
    // clear timeout, if it exists
    clearKeyTimeout();

    // if the key was a char key, update search string
    if (getDropdownActionFromKey(ev) === 'Type') {
      // update search string
      searchString.current += ev.key.toLowerCase();
      setKeyTimeout(() => {
        searchString.current = '';
      }, 500);

      // update state
      !open && setOpen(ev, true);

      const nextOption = getNextMatchingOption();
      setActiveOption(nextOption);
      setFocusVisible(true);
    }
  };

  const trigger = useTriggerSlot(state, triggerFromProps);
  trigger.onKeyDown = mergeCallbacks(onTriggerKeyDown, trigger.onKeyDown);

  return trigger;
}
