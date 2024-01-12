import * as React from 'react';
import { useTimeout, mergeCallbacks } from '@fluentui/react-utilities';
import { ActiveDescendantImperativeRef } from '@fluentui/react-aria';
import type { Slot, ExtractSlotProps, SlotComponentType } from '@fluentui/react-utilities';
import { useTriggerSlot, UseTriggerSlotState } from '../../utils/useTriggerSlot';
import { OptionValue } from '../../utils/OptionCollection.types';
import { getDropdownActionFromKey } from '../../utils/dropdownKeyActions';
import { DropdownState } from './Dropdown.types';

type UsedDropdownState = UseTriggerSlotState & Pick<DropdownState, 'getOptionsMatchingText'>;
type UseButtonTriggerSlotOptions = {
  state: UsedDropdownState;
  defaultProps: unknown;
  activeDescendantController: ActiveDescendantImperativeRef;
};

/*
 * useButtonTriggerSlot returns a tuple of trigger/listbox shorthand,
 * with the semantics and event handlers needed for the Combobox and Dropdown components.
 * The element type of the ref should always match the element type used in the trigger shorthand.
 */
export function useButtonTriggerSlot(
  triggerFromProps: NonNullable<Slot<'button'>>,
  ref: React.Ref<HTMLButtonElement>,
  options: UseButtonTriggerSlotOptions,
): SlotComponentType<ExtractSlotProps<Slot<'button'>>> {
  const {
    state: { open, setOpen, getOptionById },
    defaultProps,
    activeDescendantController,
  } = options;

  // jump to matching option based on typing
  const searchString = React.useRef('');
  const [setKeyTimeout, clearKeyTimeout] = useTimeout();

  const getNextMatchingOption = (): OptionValue | undefined => {
    // first check for matches for the full searchString
    let matcher = (optionText: string) => optionText.toLowerCase().indexOf(searchString.current) === 0;
    const activeOptionId = activeDescendantController.active();
    let match: string | undefined;

    // TODO slowly pressing same key
    match = activeDescendantController.find(id => {
      const option = getOptionById(id);
      return !!option && matcher(option.text);
    });

    // if there are no direct matches, check if the search is all the same letter, e.g. "aaa"
    if (!match) {
      const letters = searchString.current.split('');
      const allSameLetter = letters.length && letters.every(letter => letter === letters[0]);

      // if the search is all the same letter, cycle through options starting with that letter
      if (allSameLetter) {
        matcher = (optionText: string) => optionText.toLowerCase().indexOf(letters[0]) === 0;
        match = activeDescendantController.find(id => {
          if (id === activeOptionId) {
            return false;
          }

          const option = getOptionById(id);
          return !!option && matcher(option.text);
        });
      }
    }

    if (!match) {
      activeDescendantController.blur();
      return undefined;
    }

    return getOptionById(match);
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
      if (nextOption?.id) {
        activeDescendantController.focus(nextOption.id);
      }
    }
  };

  const trigger = useTriggerSlot(triggerFromProps, ref, {
    state: options.state,
    defaultProps,
    elementType: 'button',
    activeDescendantController,
  });
  trigger.onKeyDown = mergeCallbacks(onTriggerKeyDown, trigger.onKeyDown);

  return trigger;
}
