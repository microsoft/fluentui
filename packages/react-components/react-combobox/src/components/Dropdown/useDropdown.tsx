import * as React from 'react';
import { useFieldControlProps_unstable } from '@fluentui/react-field';
import { ChevronDownRegular as ChevronDownIcon } from '@fluentui/react-icons';
import { getPartitionedNativeProps, mergeCallbacks, useMergedRefs, useTimeout, slot } from '@fluentui/react-utilities';
import { getDropdownActionFromKey } from '../../utils/dropdownKeyActions';
import { useComboboxBaseState } from '../../utils/useComboboxBaseState';
import { useComboboxPositioning } from '../../utils/useComboboxPositioning';
import { useTriggerListboxSlots } from '../../utils/useTriggerListboxSlots';
import { Listbox } from '../Listbox/Listbox';
import type { Slot } from '@fluentui/react-utilities';
import type { OptionValue } from '../../utils/OptionCollection.types';
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
  // Merge props from surrounding <Field>, if any
  props = useFieldControlProps_unstable(props, { supportsLabelFor: true, supportsSize: true });

  const baseState = useComboboxBaseState(props);
  const { activeOption, getIndexOfId, getOptionsMatchingText, open, setActiveOption, setFocusVisible, setOpen } =
    baseState;

  const { primary: triggerNativeProps, root: rootNativeProps } = getPartitionedNativeProps({
    props,
    primarySlotTagName: 'button',
    excludedPropNames: ['children'],
  });

  const [comboboxPopupRef, comboboxTargetRef] = useComboboxPositioning(props);

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

  // resolve button and listbox slot props
  let triggerSlot: Slot<'button'>;
  let listboxSlot: Slot<typeof Listbox> | undefined;

  triggerSlot = slot.always(props.button, {
    defaultProps: {
      type: 'button',
      children: baseState.value || props.placeholder,
      ...triggerNativeProps,
    },
    elementType: 'button',
  });
  triggerSlot.onKeyDown = mergeCallbacks(onTriggerKeyDown, triggerSlot.onKeyDown);
  listboxSlot =
    baseState.open || baseState.hasFocus
      ? slot.optional(props.listbox, {
          renderByDefault: true,
          defaultProps: { children: props.children },
          elementType: Listbox,
        })
      : undefined;
  [triggerSlot, listboxSlot] = useTriggerListboxSlots(props, baseState, ref, triggerSlot, listboxSlot);
  const listboxRef = useMergedRefs(listboxSlot?.ref, comboboxPopupRef);
  if (listboxSlot) {
    listboxSlot.ref = listboxRef;
  }

  const rootSlot = slot.always(props.root, {
    defaultProps: {
      'aria-owns': !props.inlinePopup ? listboxSlot?.id : undefined,
      children: props.children,
      ...rootNativeProps,
    },
    elementType: 'div',
  });
  rootSlot.ref = useMergedRefs(rootSlot.ref, comboboxTargetRef);

  const state: DropdownState = {
    components: { root: 'div', button: 'button', expandIcon: 'span', listbox: Listbox },
    root: rootSlot,
    button: triggerSlot,
    listbox: listboxSlot,
    expandIcon: slot.optional(props.expandIcon, {
      renderByDefault: true,
      defaultProps: {
        children: <ChevronDownIcon />,
      },
      elementType: 'span',
    }),
    placeholderVisible: !baseState.value && !!props.placeholder,
    ...baseState,
  };

  return state;
};
