'use client';

import type * as React from 'react';
import { mergeCallbacks, slot, useEventCallback, useMergedRefs } from '@fluentui/react-utilities';

import type { DropdownProps, DropdownState } from './Dropdown.types';
import { useButtonTriggerSlot } from '@fluentui/react-combobox';
import { Listbox } from './Listbox';
import { stringifyDataAttribute } from '../../utils';
import { useListboxPopupState } from './useListboxPopupState';

/**
 * Create the state required to render Dropdown.
 *
 * The returned state can be modified with hooks such as useDropdownStyles,
 * before being passed to renderDropdown.
 *
 * @param props - props from this instance of Dropdown
 * @param ref - reference to root HTMLButtonElement of Dropdown
 */
export const useDropdown = (props: DropdownProps, ref: React.Ref<HTMLButtonElement>): DropdownState => {
  const {
    props: mergedProps,
    triggerRef,
    activeParentRef,
    activeDescendantController,
    triggerNativeProps,
    internalState,
    listbox,
    rootSlot,
  } = useListboxPopupState<DropdownProps, HTMLButtonElement>(props, {
    primarySlotTagName: 'button',
    fieldControlOptions: { supportsLabelFor: true },
    baseStateExtras: () => ({ freeform: false }),
    rootDefaultProps: p => ({ children: p.children }),
  });

  const { appearance: _appearance, size: _size, freeform: _freeform, ...baseState } = internalState;
  const { clearable, clearSelection, disabled, hasFocus, multiselect, open, selectedOptions } = baseState;

  const trigger = useButtonTriggerSlot(mergedProps.button ?? {}, useMergedRefs(triggerRef, activeParentRef, ref), {
    state: internalState,
    defaultProps: {
      type: 'button',
      // tabster navigation breaks if the button is disabled and tabIndex is 0
      tabIndex: triggerNativeProps.disabled ? undefined : 0,
      children: baseState.value || mergedProps.placeholder,
      'aria-controls': open ? listbox?.id : undefined,
      ...triggerNativeProps,
    },
    activeDescendantController,
  });

  const showClearButton = selectedOptions.length > 0 && !disabled && clearable && !multiselect;
  const state: DropdownState = {
    components: { root: 'div', button: 'button', clearButton: 'button', expandIcon: 'span', listbox: Listbox },
    root: rootSlot,
    button: {
      ...trigger,
      'data-state': open ? 'open' : 'closed',
      'data-disabled': stringifyDataAttribute(trigger.disabled),
      'data-placeholder': stringifyDataAttribute(!baseState.value),
    },
    listbox: open || hasFocus ? listbox : undefined,
    clearButton: slot.optional(mergedProps.clearButton, {
      defaultProps: {
        'aria-label': 'Clear selection',
        // Safari doesn't allow to focus an element with this
        // when the element is not visible (display: none) we need to remove it to avoid tabster issues
        tabIndex: showClearButton ? 0 : undefined,
        type: 'button',
      },
      elementType: 'button',
      renderByDefault: true,
    }),
    expandIcon: slot.optional(mergedProps.expandIcon, {
      renderByDefault: true,
      elementType: 'span',
    }),
    placeholderVisible: !baseState.value && !!mergedProps.placeholder,
    showClearButton,
    activeDescendantController,
    ...baseState,
  };

  const onClearButtonClick = useEventCallback(
    // eslint-disable-next-line react-hooks/refs
    mergeCallbacks(state.clearButton?.onClick, (ev: React.MouseEvent<HTMLButtonElement>) => {
      clearSelection(ev);
      triggerRef.current?.focus();
    }),
  );

  if (state.clearButton) {
    state.clearButton.onClick = onClearButtonClick;
  }

  // Heads up! We don't support "clearable" in multiselect mode, so we should never display a slot
  if (multiselect) {
    state.clearButton = undefined;
  }

  return state;
};
