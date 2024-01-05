import * as React from 'react';
import { mergeCallbacks, slot, useMergedRefs } from '@fluentui/react-utilities';
import type { ExtractSlotProps, Slot, SlotComponentType } from '@fluentui/react-utilities';
import { getDropdownActionFromKey, getIndexFromAction } from '../utils/dropdownKeyActions';
import type { ComboboxBaseState } from './ComboboxBase.types';

export type UseTriggerSlotState = Pick<
  ComboboxBaseState,
  | 'activeOption'
  | 'getCount'
  | 'getIndexOfId'
  | 'getOptionAtIndex'
  | 'open'
  | 'selectOption'
  | 'setActiveOption'
  | 'setFocusVisible'
  | 'setOpen'
  | 'multiselect'
  | 'value'
  | 'setHasFocus'
>;

type UseTriggerSlotOptions = {
  state: UseTriggerSlotState;
  defaultProps: unknown;
};

export function useTriggerSlot(
  triggerSlotFromProp: NonNullable<Slot<'button'>>,
  ref: React.Ref<HTMLButtonElement>,
  options: UseTriggerSlotOptions & { elementType: 'button' },
): SlotComponentType<ExtractSlotProps<Slot<'button'>>>;

export function useTriggerSlot(
  triggerSlotFromProp: NonNullable<Slot<'input'>>,
  ref: React.Ref<HTMLInputElement>,
  options: UseTriggerSlotOptions & { elementType: 'input' },
): SlotComponentType<ExtractSlotProps<Slot<'input'>>>;

/**
 * Shared trigger behaviour for combobox and dropdown
 * @returns trigger slot with desired behaviour and props
 */
export function useTriggerSlot(
  triggerSlotFromProp: NonNullable<Slot<'input'>> | NonNullable<Slot<'button'>>,
  ref: React.Ref<HTMLButtonElement> | React.Ref<HTMLInputElement>,
  options: UseTriggerSlotOptions & { elementType: 'input' | 'button' },
): SlotComponentType<ExtractSlotProps<Slot<'button'>>> | SlotComponentType<ExtractSlotProps<Slot<'input'>>> {
  const {
    state: {
      activeOption,
      getCount,
      getIndexOfId,
      getOptionAtIndex,
      open,
      selectOption,
      setActiveOption,
      setFocusVisible,
      setOpen,
      multiselect,
      setHasFocus,
    },
    defaultProps,
    elementType,
  } = options;

  const trigger = slot.always(triggerSlotFromProp, {
    defaultProps: {
      type: 'text',
      'aria-expanded': open,
      'aria-activedescendant': open ? activeOption?.id : undefined,
      role: 'combobox',
      ...(typeof defaultProps === 'object' && defaultProps),
    },
    elementType,
  });

  // handle trigger focus/blur
  const triggerRef = React.useRef<HTMLButtonElement | HTMLInputElement>(null);
  trigger.ref = useMergedRefs(triggerRef, trigger.ref, ref) as React.Ref<HTMLButtonElement & HTMLInputElement>;

  // the trigger should open/close the popup on click or blur
  trigger.onBlur = mergeCallbacks((event: React.FocusEvent<HTMLButtonElement> & React.FocusEvent<HTMLInputElement>) => {
    setOpen(event, false);
    setHasFocus(false);
  }, trigger.onBlur);

  trigger.onFocus = mergeCallbacks(
    (event: React.FocusEvent<HTMLButtonElement> & React.FocusEvent<HTMLInputElement>) => {
      if (event.target === event.currentTarget) {
        setHasFocus(true);
      }
    },
    trigger.onFocus,
  );
  trigger.onClick = mergeCallbacks(
    (event: React.MouseEvent<HTMLButtonElement> & React.MouseEvent<HTMLInputElement>) => {
      setOpen(event, !open);
    },
    trigger.onClick,
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

  // TODO fix cast
  return trigger as SlotComponentType<ExtractSlotProps<Slot<'input'>>>;
}
