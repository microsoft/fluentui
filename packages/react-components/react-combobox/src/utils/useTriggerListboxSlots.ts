import * as React from 'react';
import { useMergedRefs } from '@fluentui/react-utilities';
import type { ExtractSlotProps, Slot } from '@fluentui/react-utilities';
import { getDropdownActionFromKey, getIndexFromAction } from '../utils/dropdownKeyActions';
import { Listbox } from '../components/Listbox/Listbox';
import type { ComboboxBaseProps, ComboboxBaseState } from './ComboboxBase.types';

export function useTriggerListboxSlots(
  props: ComboboxBaseProps,
  state: ComboboxBaseState,
  ref: React.Ref<HTMLButtonElement>,
  triggerSlot?: ExtractSlotProps<Slot<'button'>>,
  listboxSlot?: ExtractSlotProps<Slot<typeof Listbox>>,
): [ExtractSlotProps<Slot<'button'>>, ExtractSlotProps<Slot<typeof Listbox>>];
export function useTriggerListboxSlots(
  props: ComboboxBaseProps,
  state: ComboboxBaseState,
  ref: React.Ref<HTMLInputElement>,
  triggerSlot?: ExtractSlotProps<Slot<'input'>>,
  listboxSlot?: ExtractSlotProps<Slot<typeof Listbox>>,
): [ExtractSlotProps<Slot<'input'>>, ExtractSlotProps<Slot<typeof Listbox>>];

/*
 * useTriggerListboxSlots returns a tuple of trigger/listbox shorthand,
 * with the semantics and event handlers needed for the Combobox and Dropdown components.
 * The element type of the ref should always match the element type used in the trigger shorthand.
 */
export function useTriggerListboxSlots(
  props: ComboboxBaseProps,
  state: ComboboxBaseState,
  ref: React.Ref<HTMLButtonElement | HTMLInputElement>,
  triggerSlot?: ExtractSlotProps<Slot<'input'>> | ExtractSlotProps<Slot<'button'>>,
  listboxSlot?: ExtractSlotProps<Slot<typeof Listbox>>,
): [ExtractSlotProps<Slot<'input'>> | ExtractSlotProps<Slot<'button'>>, ExtractSlotProps<Slot<typeof Listbox>>] {
  const { multiselect } = props;
  const {
    activeOption,
    getCount,
    getIndexOfId,
    getOptionAtIndex,
    open,
    selectOption,
    setActiveOption,
    setOpen,
  } = state;

  // handle trigger focus/blur
  const triggerRef: typeof ref = React.useRef(null);
  const ignoreTriggerBlur = React.useRef(false);

  // resolve listbox shorthand props
  const listbox: typeof listboxSlot = {
    multiselect,
    tabIndex: undefined,
    ...listboxSlot,
  };

  // resolve trigger shorthand props
  const trigger: typeof triggerSlot = {
    'aria-expanded': open,
    'aria-activedescendant': open ? activeOption?.id : undefined,
    role: 'combobox',
    ...triggerSlot,
    // explicitly type the ref as an intersection here to prevent type errors
    // since the `children` prop has mutually incompatible types between input/button
    // functionally both ref and triggerRef will always be the same element type
    ref: useMergedRefs(ref, triggerSlot?.ref, triggerRef) as React.Ref<HTMLButtonElement & HTMLInputElement>,
  };

  /*
   * Handle focus when clicking the listbox popup:
   * 1. Move focus back to the button/input when the listbox is clicked (otherwise it goes to body)
   * 2. Do not close the listbox on button/input blur when clicking into the listbox
   */
  const { onClick: onListboxClick, onMouseDown: onListboxMouseDown } = listbox;
  listbox.onClick = (event: React.MouseEvent<HTMLDivElement>) => {
    triggerRef.current?.focus();

    onListboxClick?.(event);
  };

  listbox.onMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    ignoreTriggerBlur.current = true;

    onListboxMouseDown?.(event);
  };

  // the trigger should open/close the popup on click or blur
  const { onBlur: onTriggerBlur, onClick: onTriggerClick, onKeyDown: onTriggerKeyDown } = trigger;
  trigger.onBlur = (event: React.FocusEvent<HTMLButtonElement> & React.FocusEvent<HTMLInputElement>) => {
    if (!ignoreTriggerBlur.current) {
      setOpen(event, false);
    }

    ignoreTriggerBlur.current = false;

    onTriggerBlur?.(event);
  };

  trigger.onClick = (event: React.MouseEvent<HTMLButtonElement> & React.MouseEvent<HTMLInputElement>) => {
    setOpen(event, !open);

    onTriggerClick?.(event);
  };

  // handle combobox keyboard interaction
  trigger.onKeyDown = (event: React.KeyboardEvent<HTMLButtonElement> & React.KeyboardEvent<HTMLInputElement>) => {
    const action = getDropdownActionFromKey(event, { open, multiselect });
    const maxIndex = getCount() - 1;
    const activeIndex = activeOption ? getIndexOfId(activeOption.id) : -1;
    let newIndex = activeIndex;

    switch (action) {
      case 'Open':
        event.preventDefault();
        setOpen(event, true);
        break;
      case 'Close':
        // stop propagation for escape key to avoid dismissing any parent popups
        event.stopPropagation();
        event.preventDefault();
        setOpen(event, false);
        break;
      case 'CloseSelect':
        !multiselect && !activeOption?.disabled && setOpen(event, false);
      // fallthrough
      case 'Select':
        activeOption && selectOption(event, activeOption);
        event.preventDefault();
        break;
      case 'Tab':
        activeOption && selectOption(event, activeOption);
        break;
      default:
        newIndex = getIndexFromAction(action, activeIndex, maxIndex);
    }
    if (newIndex !== activeIndex) {
      // prevent default page scroll/keyboard action if the index changed
      event.preventDefault();
      setActiveOption(getOptionAtIndex(newIndex));
    }

    onTriggerKeyDown?.(event);
  };

  return [trigger, listbox];
}
