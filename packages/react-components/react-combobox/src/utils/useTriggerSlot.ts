import * as React from 'react';
import { useSetKeyboardNavigation } from '@fluentui/react-tabster';
import type { ActiveDescendantImperativeRef } from '@fluentui/react-aria';
import { mergeCallbacks, slot, useEventCallback, useMergedRefs } from '@fluentui/react-utilities';
import type { ExtractSlotProps, Slot, SlotComponentType } from '@fluentui/react-utilities';
import { getDropdownActionFromKey } from '../utils/dropdownKeyActions';
import type { ComboboxBaseState } from './ComboboxBase.types';
import { OptionValue } from './OptionCollection.types';

export type UseTriggerSlotState = Pick<
  ComboboxBaseState,
  'open' | 'getOptionById' | 'selectOption' | 'setOpen' | 'multiselect' | 'setHasFocus'
>;

type UseTriggerSlotOptions = {
  state: UseTriggerSlotState;
  defaultProps: unknown;
  activeDescendantController: ActiveDescendantImperativeRef;
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
    state: { open, setOpen, setHasFocus },
    defaultProps,
    elementType,
    activeDescendantController,
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
    useTriggerKeydown({ activeDescendantController, ...options.state }),
    trigger.onKeyDown,
  );

  return trigger as SlotComponentType<ExtractSlotProps<Slot<'input'>>>;
}

function useTriggerKeydown(
  options: {
    activeDescendantController: ActiveDescendantImperativeRef;
  } & Pick<UseTriggerSlotState, 'setOpen' | 'selectOption' | 'getOptionById' | 'multiselect' | 'open'>,
) {
  const { activeDescendantController, getOptionById, setOpen, selectOption, multiselect, open } = options;

  const getActiveOption = React.useCallback(() => {
    const activeOptionId = activeDescendantController.active();
    return activeOptionId ? getOptionById(activeOptionId) : undefined;
  }, [activeDescendantController, getOptionById]);

  const first = () => {
    activeDescendantController.first();
  };

  const last = () => {
    activeDescendantController.last();
  };

  const next = (activeOption: OptionValue | undefined) => {
    if (activeOption) {
      activeDescendantController.next();
    } else {
      activeDescendantController.first();
    }
  };

  const previous = (activeOption: OptionValue | undefined) => {
    if (activeOption) {
      activeDescendantController.prev();
    } else {
      activeDescendantController.first();
    }
  };

  const pageUp = () => {
    for (let i = 0; i < 10; i++) {
      activeDescendantController.prev();
    }
  };

  const pageDown = () => {
    for (let i = 0; i < 10; i++) {
      activeDescendantController.next();
    }
  };

  const setKeyboardNavigation = useSetKeyboardNavigation();
  return useEventCallback((e: React.KeyboardEvent<HTMLInputElement> & React.KeyboardEvent<HTMLButtonElement>) => {
    const action = getDropdownActionFromKey(e, { open, multiselect });
    const activeOption = getActiveOption();

    switch (action) {
      case 'First':
      case 'Last':
      case 'Next':
      case 'Previous':
      case 'PageDown':
      case 'PageUp':
      case 'Open':
      case 'Close':
      case 'CloseSelect':
      case 'Select':
        e.preventDefault();
        break;
    }

    setKeyboardNavigation(true);

    switch (action) {
      case 'First':
        first();
        break;
      case 'Last':
        last();
        break;
      case 'Next':
        next(activeOption);
        break;
      case 'Previous':
        previous(activeOption);
        break;
      case 'PageDown':
        pageDown();
        break;
      case 'PageUp':
        pageUp();
        break;
      case 'Open':
        setOpen(e, true);
        break;
      case 'Close':
        // stop propagation for escape key to avoid dismissing any parent popups
        e.stopPropagation();
        setOpen(e, false);
        break;
      case 'CloseSelect':
        !multiselect && !activeOption?.disabled && setOpen(e, false);
      // fallthrough
      case 'Select':
        activeOption && selectOption(e, activeOption);
        break;
      case 'Tab':
        !multiselect && activeOption && selectOption(e, activeOption);
        break;
    }
  });
}
