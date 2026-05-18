'use client';

import type * as React from 'react';
import { mergeCallbacks, useEventCallback, useMergedRefs, slot } from '@fluentui/react-utilities';
import type { ComboboxProps, ComboboxState } from './Combobox.types';
import { useInputTriggerSlot } from '@fluentui/react-combobox';
import { Listbox } from '../Dropdown/Listbox';
import { stringifyDataAttribute } from '../../utils';
import { useListboxPopupState } from '../Dropdown/useListboxPopupState';

export const useCombobox = (props: ComboboxProps, ref: React.Ref<HTMLInputElement>): ComboboxState => {
  'use no memo';

  const { freeform } = props;

  const {
    props: mergedProps,
    triggerRef,
    activeParentRef,
    activeDescendantController,
    triggerNativeProps,
    internalState,
    listbox,
    rootSlot,
  } = useListboxPopupState<ComboboxProps, HTMLInputElement>(props, {
    primarySlotTagName: 'input',
    fieldControlOptions: { supportsLabelFor: true, supportsRequired: true },
    // For multiselect, editable should be false to display comma-separated values in the trigger
    // For single-select, editable is true to allow filtering
    baseStateExtras: p => ({ editable: !p.multiselect }),
  });

  const { appearance: _appearance, size: _size, ...baseState } = internalState;
  const { clearable, clearSelection, disabled, hasFocus, multiselect, open, selectedOptions } = baseState;

  const triggerSlot = useInputTriggerSlot(mergedProps.input ?? {}, useMergedRefs(triggerRef, activeParentRef, ref), {
    state: internalState,
    freeform,
    defaultProps: {
      type: 'text',
      value: baseState.value ?? '',
      'aria-controls': open ? listbox?.id : undefined,
      ...triggerNativeProps,
    },
    activeDescendantController,
  });

  const showClearIcon = selectedOptions.length > 0 && !disabled && clearable && !multiselect;

  const state: ComboboxState = {
    components: { root: 'div', input: 'input', expandIcon: 'span', clearIcon: 'span', listbox: Listbox },
    root: rootSlot,
    input: {
      ...triggerSlot,
      'data-state': open ? 'open' : 'closed',
      'data-disabled': stringifyDataAttribute(triggerSlot.disabled),
      'data-placeholder': stringifyDataAttribute(!baseState.value),
    },
    listbox: open || hasFocus ? listbox : undefined,
    clearIcon: slot.optional(mergedProps.clearIcon, {
      defaultProps: { 'aria-hidden': 'true' },
      elementType: 'span',
      renderByDefault: true,
    }),
    expandIcon: slot.optional(mergedProps.expandIcon, {
      renderByDefault: true,
      elementType: 'span',
    }),
    showClearIcon,
    activeDescendantController,
    ...baseState,
  };

  const onClearIconMouseDown = useEventCallback(
    mergeCallbacks(state.clearIcon?.onMouseDown, (ev: React.MouseEvent<HTMLSpanElement>) => {
      ev.preventDefault();
    }),
  );
  const onClearIconClick = useEventCallback(
    mergeCallbacks(state.clearIcon?.onClick, (ev: React.MouseEvent<HTMLSpanElement>) => {
      clearSelection(ev);
      triggerRef.current?.focus();
    }),
  );

  if (state.clearIcon) {
    state.clearIcon.onMouseDown = onClearIconMouseDown;
    state.clearIcon.onClick = onClearIconClick;
  }

  // Heads up! We don't support "clearable" in multiselect mode, so we should never display a slot
  if (multiselect) {
    state.clearIcon = undefined;
  }

  return state;
};
