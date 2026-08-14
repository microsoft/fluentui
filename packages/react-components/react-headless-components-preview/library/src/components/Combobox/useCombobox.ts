'use client';

import * as React from 'react';
import { mergeCallbacks, useEventCallback, useId, useMergedRefs, slot } from '@fluentui/react-utilities';
import type { ComboboxProps, ComboboxState } from './Combobox.types';
import { useInputTriggerSlot } from '@fluentui/react-combobox';
import { Listbox } from '../Dropdown/Listbox';
import { stringifyDataAttribute } from '../../utils';
import { useListboxPopupState } from '../Dropdown/useListboxPopupState';

export const useCombobox = (props: ComboboxProps, ref: React.Ref<HTMLInputElement>): ComboboxState => {
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
  const { clearable, clearSelection, disabled, hasFocus, multiselect, open, selectedOptions, setOpen } = baseState;
  const chevronFallbackId = useId('combobox-chevron-');
  // The listbox is a native popover: light-dismiss closes it on pointerup, before `click` runs.
  // Toggling has to be based on the state captured when the interaction started, otherwise clicking
  // the icon to close would immediately reopen it.
  const openOnPointerDownRef = React.useRef(false);

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
      defaultProps: { 'aria-hidden': 'true', role: 'button' },
      elementType: 'span',
      renderByDefault: true,
    }),
    expandIcon: slot.optional(mergedProps.expandIcon, {
      renderByDefault: true,
      defaultProps: {
        'aria-disabled': disabled ? 'true' : undefined,
        'aria-expanded': open,
        role: 'button',
      },
      elementType: 'span',
    }),
    showClearIcon,
    activeDescendantController,
    ...baseState,
  };

  const onExpandIconMouseDown = useEventCallback(
    // eslint-disable-next-line react-hooks/refs
    mergeCallbacks(state.expandIcon?.onMouseDown, (event: React.MouseEvent<HTMLSpanElement>) => {
      // Keep focus on the input instead of moving it to the icon
      event.preventDefault();
      openOnPointerDownRef.current = open;
    }),
  );

  const onExpandIconClick = useEventCallback(
    // eslint-disable-next-line react-hooks/refs
    mergeCallbacks(state.expandIcon?.onClick, (event: React.MouseEvent<HTMLSpanElement>) => {
      event.preventDefault();
      setOpen(event, !openOnPointerDownRef.current);
      triggerRef.current?.focus();
    }),
  );

  if (state.expandIcon) {
    state.expandIcon.onMouseDown = onExpandIconMouseDown;
    state.expandIcon.onClick = onExpandIconClick;

    // If there is no explicit aria-label, calculate default accName attribute for the expandIcon button,
    // using the following steps:
    // 1. If there is an aria-label, it is "Open [aria-label]"
    // 2. If there is an aria-labelledby, it is "Open [aria-labelledby target]" (using aria-labelledby + ids)
    // 3. If there is no aria-label/ledby attr, it falls back to "Open"
    // We can't fall back to a label/htmlFor name because of https://github.com/w3c/accname/issues/179
    const hasExpandLabel = state.expandIcon['aria-label'] || state.expandIcon['aria-labelledby'];
    const defaultOpenString = 'Open'; // this is english-only since it is the fallback
    if (!hasExpandLabel) {
      if (mergedProps['aria-labelledby']) {
        const chevronId = state.expandIcon.id ?? chevronFallbackId;

        state.expandIcon['aria-label'] = defaultOpenString;
        state.expandIcon.id = chevronId;
        state.expandIcon['aria-labelledby'] = `${chevronId} ${triggerSlot['aria-labelledby']}`;
      } else if (mergedProps['aria-label']) {
        state.expandIcon['aria-label'] = `${defaultOpenString} ${mergedProps['aria-label']}`;
      } else {
        state.expandIcon['aria-label'] = defaultOpenString;
      }
    }
  }

  const onClearIconMouseDown = useEventCallback(
    mergeCallbacks(state.clearIcon?.onMouseDown, (ev: React.MouseEvent<HTMLSpanElement>) => {
      ev.preventDefault();
    }),
  );
  const onClearIconClick = useEventCallback(
    // eslint-disable-next-line react-hooks/refs
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
