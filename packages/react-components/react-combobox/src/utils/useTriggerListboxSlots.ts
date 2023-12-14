import * as React from 'react';
import { useFluent_unstable } from '@fluentui/react-shared-contexts';
import { mergeCallbacks, useId, useEventCallback, useMergedRefs } from '@fluentui/react-utilities';
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
): [trigger: ExtractSlotProps<Slot<'button'>>, listbox?: ExtractSlotProps<Slot<typeof Listbox>>];
export function useTriggerListboxSlots(
  props: ComboboxBaseProps,
  state: ComboboxBaseState,
  ref: React.Ref<HTMLInputElement>,
  triggerSlot?: ExtractSlotProps<Slot<'input'>>,
  listboxSlot?: ExtractSlotProps<Slot<typeof Listbox>>,
): [trigger: ExtractSlotProps<Slot<'input'>>, listbox?: ExtractSlotProps<Slot<typeof Listbox>>];

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
): [
  trigger: ExtractSlotProps<Slot<'input'>> | ExtractSlotProps<Slot<'button'>>,
  listbox?: ExtractSlotProps<Slot<typeof Listbox>>,
] {
  const { multiselect } = props;
  const {
    activeOption,
    getCount,
    getIndexOfId,
    getOptionAtIndex,
    ignoreNextBlur,
    open,
    selectOption,
    setActiveOption,
    setFocusVisible,
    setHasFocus,
    setOpen,
  } = state;

  // handle trigger focus/blur
  const triggerRef: typeof ref = React.useRef(null);
  const listboxRef: NonNullable<typeof listboxSlot>['ref'] = React.useRef(null);

  // resolve listbox shorthand props
  const listboxId = useId('fluent-listbox', listboxSlot?.id);
  const mergedListboxRef = useMergedRefs(listboxSlot?.ref, listboxRef);
  const listbox: typeof listboxSlot = listboxSlot && {
    id: listboxId,
    multiselect,
    tabIndex: undefined,
    ...listboxSlot,
    ref: mergedListboxRef,
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
  const listboxOnClick = useEventCallback(
    mergeCallbacks((event: React.MouseEvent<HTMLDivElement>) => {
      triggerRef.current?.focus();
    }, listbox?.onClick),
  );

  const listboxOnMouseOver = useEventCallback(
    mergeCallbacks((event: React.MouseEvent<HTMLDivElement>) => {
      setFocusVisible(false);
    }, listbox?.onMouseOver),
  );

  const { targetDocument } = useFluent_unstable();
  const documentOnMouseUp = useEventCallback((ev: MouseEvent) => {
    if (!listboxRef.current?.contains(ev.target as HTMLElement)) {
      setOpen(ev as unknown as React.MouseEvent<HTMLElement>, false);
    }
    targetDocument?.removeEventListener('mouseup', documentOnMouseUp);
  });

  const listboxOnMouseDown = useEventCallback(
    mergeCallbacks((event: React.MouseEvent<HTMLDivElement>) => {
      ignoreNextBlur.current = true;
      targetDocument?.addEventListener('mouseup', documentOnMouseUp);
    }, listbox?.onMouseDown),
  );

  const listboxOnMouseUp = useEventCallback(
    mergeCallbacks((event: React.MouseEvent<HTMLDivElement>) => {
      // some listbox clicks don't blur the input (e.g. clicking a scrollbar)
      // this ensures future blurs that occur after the click aren't ignored
      ignoreNextBlur.current = false;
    }, listbox?.onMouseUp),
  );

  // listbox is nullable, only add event handlers if it exists
  if (listbox) {
    listbox.onClick = listboxOnClick;
    listbox.onMouseOver = listboxOnMouseOver;
    listbox.onMouseDown = listboxOnMouseDown;
    listbox.onMouseUp = listboxOnMouseUp;
  }

  // the trigger should open/close the popup on click or blur
  trigger.onBlur = mergeCallbacks((event: React.FocusEvent<HTMLButtonElement> & React.FocusEvent<HTMLInputElement>) => {
    if (!ignoreNextBlur.current) {
      setOpen(event, false);
    }

    ignoreNextBlur.current = false;

    setHasFocus(false);
  }, trigger.onBlur);

  trigger.onClick = mergeCallbacks(
    (event: React.MouseEvent<HTMLButtonElement> & React.MouseEvent<HTMLInputElement>) => {
      setOpen(event, !open);
    },
    trigger.onClick,
  );

  trigger.onFocus = mergeCallbacks(
    (event: React.FocusEvent<HTMLButtonElement> & React.FocusEvent<HTMLInputElement>) => {
      setHasFocus(true);
    },
    trigger.onFocus,
  );

  // handle combobox keyboard interaction
  trigger.onKeyDown = mergeCallbacks(
    (event: React.KeyboardEvent<HTMLButtonElement> & React.KeyboardEvent<HTMLInputElement>) => {
      const action = getDropdownActionFromKey(event, { open, multiselect });
      const maxIndex = getCount() - 1;
      const activeIndex = activeOption ? getIndexOfId(activeOption.id) : -1;
      let newIndex = activeIndex;

      switch (action) {
        case 'Open':
          event.preventDefault();
          setFocusVisible(true);
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
          !multiselect && activeOption && selectOption(event, activeOption);
          break;
        default:
          newIndex = getIndexFromAction(action, activeIndex, maxIndex);
      }
      if (newIndex !== activeIndex) {
        // prevent default page scroll/keyboard action if the index changed
        event.preventDefault();
        setActiveOption(getOptionAtIndex(newIndex));
        setFocusVisible(true);
      }
    },
    trigger.onKeyDown,
  );

  trigger.onMouseOver = mergeCallbacks(
    (event: React.MouseEvent<HTMLButtonElement> & React.MouseEvent<HTMLInputElement>) => {
      setFocusVisible(false);
    },
    trigger.onMouseOver,
  );

  return [trigger, listbox];
}
