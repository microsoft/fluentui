import * as React from 'react';
import { ChevronDownRegular as ChevronDownIcon } from '@fluentui/react-icons';
import { getPartitionedNativeProps, mergeCallbacks, resolveShorthand } from '@fluentui/react-utilities';
import { getDropdownActionFromKey } from '../../utils/dropdownKeyActions';
import { useComboboxBaseState } from '../../utils/useComboboxBaseState';
import { useTriggerListboxSlots } from '../../utils/useTriggerListboxSlots';
import { useComboboxPopup } from '../../utils/useComboboxPopup';
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
  const baseState = useComboboxBaseState(props);
  const { activeOption, getIndexOfId, getOptionsMatchingValue, open, setActiveOption, setOpen } = baseState;

  const { primary: triggerNativeProps, root: rootNativeProps } = getPartitionedNativeProps({
    props,
    primarySlotTagName: 'button',
    excludedPropNames: ['children'],
  });

  // jump to matching option based on typing
  const searchString = React.useRef('');
  const keyTimeoutRef = React.useRef<number>();

  const getNextMatchingOption = (): OptionValue | undefined => {
    const matcher = (optionValue: string) => optionValue.toLowerCase().indexOf(searchString.current) === 0;
    const matches = getOptionsMatchingValue(matcher);

    // return first matching option after the current active option, looping back to the top
    if (matches.length > 1 && activeOption) {
      const startIndex = getIndexOfId(activeOption.id);
      const nextMatch = matches.find(option => getIndexOfId(option.id) >= startIndex);
      return nextMatch ?? matches[0];
    }

    return matches[0] ?? undefined;
  };

  const onTriggerKeyDown = (ev: React.KeyboardEvent<HTMLButtonElement>) => {
    // clear timeout, if it exists
    if (keyTimeoutRef.current) {
      window.clearTimeout(keyTimeoutRef.current);
      keyTimeoutRef.current = undefined;
    }

    // if the key was a char key, update search string
    if (getDropdownActionFromKey(ev) === 'Type') {
      // update search string
      searchString.current += ev.key.toLowerCase();
      keyTimeoutRef.current = setTimeout(() => {
        searchString.current = '';
      }, 500);

      // update state
      !open && setOpen(ev, true);

      const nextOption = getNextMatchingOption();
      setActiveOption(nextOption);
    }
  };

  // resolve button and listbox slot props
  let triggerSlot: Slot<'button'>;
  let listboxSlot: Slot<typeof Listbox> | undefined;

  triggerSlot = resolveShorthand(props.button, {
    required: true,
    defaultProps: {
      type: 'button',
      children: baseState.value || props.placeholder,
      ...triggerNativeProps,
    },
  });

  triggerSlot.onKeyDown = mergeCallbacks(onTriggerKeyDown, triggerSlot.onKeyDown);

  listboxSlot = baseState.open
    ? resolveShorthand(props.listbox, {
        required: true,
        defaultProps: { children: props.children },
      })
    : undefined;

  [triggerSlot, listboxSlot] = useComboboxPopup(props, triggerSlot, listboxSlot);
  [triggerSlot, listboxSlot] = useTriggerListboxSlots(props, baseState, ref, triggerSlot, listboxSlot);

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
