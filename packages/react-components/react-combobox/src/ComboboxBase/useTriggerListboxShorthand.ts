import * as React from 'react';
import { resolveShorthand, useMergedRefs } from '@fluentui/react-utilities';
import type { ExtractSlotProps, Slot } from '@fluentui/react-utilities';
import { getDropdownActionFromKey, getIndexFromAction } from '../utils/dropdownKeyActions';
import { Listbox } from '../components/Listbox/Listbox';
import type { ComboboxBaseProps, ComboboxBaseState } from './ComboboxBase.types';

type TriggerListboxShorthandFunction = {
  (
    props: ComboboxBaseProps,
    state: ComboboxBaseState,
    ref: React.Ref<HTMLButtonElement>,
    triggerShorthand?: ExtractSlotProps<Slot<'button'>>,
    listboxShorthand?: ExtractSlotProps<Slot<typeof Listbox>>,
  ): [ExtractSlotProps<Slot<'button'>>, ExtractSlotProps<Slot<typeof Listbox>>];
  (
    props: ComboboxBaseProps,
    state: ComboboxBaseState,
    ref: React.Ref<HTMLInputElement>,
    triggerShorthand?: ExtractSlotProps<Slot<'input'>>,
    listboxShorthand?: ExtractSlotProps<Slot<typeof Listbox>>,
  ): [ExtractSlotProps<Slot<'input'>>, ExtractSlotProps<Slot<typeof Listbox>>];
};

export const useTriggerListboxShorthand: TriggerListboxShorthandFunction = (
  props,
  state,
  ref,
  triggerShorthand,
  listboxShorthand,
) => {
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
  const listbox = resolveShorthand(listboxShorthand, {
    required: true,
    defaultProps: {
      multiselect,
      tabIndex: undefined,
    },
  });

  // resolve trigger shorthand props
  const trigger = resolveShorthand(triggerShorthand, {
    required: true,
    defaultProps: {
      'aria-expanded': open,
      'aria-activedescendant': open ? activeOption?.id : undefined,
      ref: useMergedRefs(ref, triggerRef),
      role: 'combobox',
    },
  });

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

  return [trigger, listbox];
};
