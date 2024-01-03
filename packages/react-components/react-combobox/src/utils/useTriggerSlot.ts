import * as React from 'react';
import { mergeCallbacks, slot, useMergedRefs } from '@fluentui/react-utilities';
import type { ExtractSlotProps, Slot, SlotComponentType } from '@fluentui/react-utilities';
import { ActiveDescendantImperativeRef } from '@fluentui/react-aria';
import { getDropdownActionFromKey } from '../utils/dropdownKeyActions';
import type { ComboboxBaseState } from './ComboboxBase.types';

export type UseTriggerSlotState = Pick<
  ComboboxBaseState,
  'activeOption' | 'getOptionById' | 'open' | 'selectOption' | 'setOpen' | 'multiselect' | 'value' | 'setHasFocus'
>;

type UseTriggerSlotOptions = {
  state: UseTriggerSlotState;
  defaultProps: unknown;
  activeDescendantImperativeRef: React.RefObject<ActiveDescendantImperativeRef>;
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
    state: { open, selectOption, setOpen, multiselect, setHasFocus, getOptionById },
    defaultProps,
    elementType,
    activeDescendantImperativeRef,
  } = options;

  const trigger = slot.always(triggerSlotFromProp, {
    defaultProps: {
      type: 'text',
      'aria-expanded': open,
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
      const activeOptionId = activeDescendantImperativeRef.current?.active();
      const activeOption = activeOptionId ? getOptionById(activeOptionId) : null;

      switch (action) {
        case 'First':
          activeDescendantImperativeRef.current?.first();
          event.preventDefault();
          break;
        case 'Next':
          activeDescendantImperativeRef.current?.next();
          event.preventDefault();
          break;
        case 'Previous':
          activeDescendantImperativeRef.current?.prev();
          event.preventDefault();
          break;
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
          !multiselect && activeOption && selectOption(event, activeOption);
          break;
      }
    },
    trigger.onKeyDown,
  );

  return trigger as SlotComponentType<ExtractSlotProps<Slot<'input'>>>;
}
