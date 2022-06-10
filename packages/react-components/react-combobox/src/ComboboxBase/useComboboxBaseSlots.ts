import * as React from 'react';
import { useMergedRefs } from '@fluentui/react-utilities';
import { getDropdownActionFromKey, getIndexFromAction } from '../utils/dropdownKeyActions';
import type { ComboboxState } from '../components/Combobox/Combobox.types';
import type { ComboboxBaseProps } from './ComboboxBase.types';

export const useComboboxBaseSlots = (props: ComboboxBaseProps, state: ComboboxState) => {
  const { multiselect, placeholder } = props;
  const {
    activeOption,
    getCount,
    getIndexOfId,
    getOptionAtIndex,
    open,
    selectOption,
    setActiveOption,
    setOpen,
    value,
  } = state;

  // handle trigger focus/blur
  const triggerRef = React.useRef<HTMLButtonElement | HTMLInputElement>(null);
  const ignoreTriggerBlur = React.useRef(false);

  /* Add listbox props and event handlers  */
  state.listbox = {
    multiselect,
    tabIndex: undefined,
    ...state.listbox,
  };

  /*
   * Handle focus when clicking the listbox popup:
   * 1. Move focus back to the button/input when the listbox is clicked (otherwise it goes to body)
   * 2. Do not close the listbox on button/input blur when clicking into the listbox
   */
  const { onClick: onListboxClick, onMouseDown: onListboxMouseDown } = state.listbox;
  state.listbox.onClick = (event: React.MouseEvent<HTMLDivElement>) => {
    triggerRef.current?.focus();

    onListboxClick?.(event);
  };

  state.listbox.onMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    ignoreTriggerBlur.current = true;

    onListboxMouseDown?.(event);
  };

  /* Add trigger props and event handlers */
  let triggerSlot;

  if (state.input) {
    state.input = {
      'aria-expanded': open,
      'aria-activedescendant': open ? activeOption?.id : undefined,
      placeholder,
      role: 'combobox',
      type: 'text',
      value,
      ...state.input,
      ref: useMergedRefs(state.input.ref, triggerRef as React.RefObject<HTMLInputElement>),
    };

    triggerSlot = state.input;
  }

  // the trigger should open/close the popup on click or blur
  const { onBlur: onTriggerBlur, onClick: onTriggerClick, onKeyDown: onTriggerKeyDown } = triggerSlot;
  triggerSlot.onBlur = (event: React.FocusEvent<HTMLButtonElement> & React.FocusEvent<HTMLInputElement>) => {
    if (!ignoreTriggerBlur.current) {
      setOpen(event, false);
    }

    ignoreTriggerBlur.current = false;

    onTriggerBlur?.(event);
  };

  triggerSlot.onClick = (event: React.MouseEvent<HTMLButtonElement> & React.MouseEvent<HTMLInputElement>) => {
    setOpen(event, !open);

    onTriggerClick?.(event);
  };

  // handle combobox keyboard interaction
  triggerSlot.onKeyDown = (event: React.KeyboardEvent<HTMLButtonElement> & React.KeyboardEvent<HTMLInputElement>) => {
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
        !multiselect && setOpen(event, false);
      // fallthrough
      case 'Select':
        activeOption && selectOption(event, activeOption.value);
        event.preventDefault();
        break;
      case 'Tab':
        activeOption && selectOption(event, activeOption.value);
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
};
