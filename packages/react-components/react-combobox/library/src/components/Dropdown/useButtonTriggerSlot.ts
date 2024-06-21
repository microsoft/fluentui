import * as React from 'react';
import { useTimeout, mergeCallbacks } from '@fluentui/react-utilities';
import type { Slot, ExtractSlotProps, SlotComponentType } from '@fluentui/react-utilities';
import type { ActiveDescendantImperativeRef } from '@fluentui/react-aria';
import { useTriggerSlot, UseTriggerSlotState } from '../../utils/useTriggerSlot';
import { getDropdownActionFromKey } from '../../utils/dropdownKeyActions';

type UseButtonTriggerSlotOptions = {
  state: UseTriggerSlotState;
  defaultProps: unknown;
  activeDescendantController: ActiveDescendantImperativeRef;
};

/**
 * @internal
 * useButtonTriggerSlot returns a tuple of trigger/listbox shorthand,
 * with the semantics and event handlers needed for the Combobox and Dropdown components.
 * The element type of the ref should always match the element type used in the trigger shorthand.
 */
export function useButtonTriggerSlot(
  triggerFromProps: NonNullable<Slot<'button'>>,
  ref: React.Ref<HTMLButtonElement>,
  options: UseButtonTriggerSlotOptions,
): SlotComponentType<ExtractSlotProps<Slot<'button'>>> {
  'use no memo';

  const {
    state: { open, setOpen, getOptionById },
    defaultProps,
    activeDescendantController,
  } = options;

  // jump to matching option based on typing
  const searchString = React.useRef('');
  const [setKeyTimeout, clearKeyTimeout] = useTimeout();

  const moveToNextMatchingOption = (
    matcher: (optionText: string) => boolean,
    opt: { startFromNext: boolean } = { startFromNext: false },
  ) => {
    const { startFromNext } = opt;
    const activeOptionId = activeDescendantController.active();

    const nextInOrder = activeDescendantController.find(
      id => {
        const option = getOptionById(id);
        return !!option && matcher(option.text);
      },
      { startFrom: startFromNext ? activeDescendantController.next({ passive: true }) : activeOptionId },
    );

    if (nextInOrder) {
      return nextInOrder;
    }

    // Cycle back to first match
    return activeDescendantController.find(id => {
      const option = getOptionById(id);
      return !!option && matcher(option.text);
    });
  };

  const moveToNextMatchingOptionWithSameCharacterHandling = () => {
    if (
      moveToNextMatchingOption(
        optionText => {
          return optionText.toLocaleLowerCase().indexOf(searchString.current) === 0;
        },
        {
          // Slowly pressing the same key will cycle through options
          startFromNext: searchString.current.length === 1,
        },
      )
    ) {
      return;
    }

    // if there are no direct matches, check if the search is all the same letter, e.g. "aaa"
    if (
      allCharactersSame(searchString.current) &&
      moveToNextMatchingOption(
        optionText => {
          return optionText.toLocaleLowerCase().indexOf(searchString.current[0]) === 0;
        },
        {
          // if the search is all the same letter, cycle through options starting with that letter
          startFromNext: true,
        },
      )
    ) {
      return;
    }

    activeDescendantController.blur();
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

      if (open) {
        moveToNextMatchingOptionWithSameCharacterHandling();
      }

      // update state
      !open && setOpen(ev, true);
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

/**
 * @returns - whether every character in the string is the same
 */
function allCharactersSame(str: string) {
  for (let i = 1; i < str.length; i++) {
    if (str[i] !== str[i - 1]) {
      return false;
    }
  }

  return true;
}
