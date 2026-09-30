'use client';

import * as React from 'react';
import { mergeCallbacks, useEventCallback, useMergedRefs, slot } from '@fluentui/react-utilities';
import { useComboboxExpandIconSlot, useInputTriggerSlot } from '@fluentui/react-combobox';
import type { ComboboxProps, ComboboxState } from './Combobox.types';
import { Listbox } from '../Dropdown/Listbox';
import { toDataAttributeValue } from '../../utils';
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
  const placeholderVisible = !baseState.value && !!mergedProps.placeholder;

  const state: ComboboxState = {
    ...baseState,
    components: { root: 'div', input: 'input', expandIcon: 'span', clearIcon: 'span', listbox: Listbox },
    root: {
      ...rootSlot,
      'data-open': toDataAttributeValue(open),
      'data-disabled': toDataAttributeValue(triggerSlot.disabled),
      'data-placeholder': toDataAttributeValue(placeholderVisible),
      'data-invalid': toDataAttributeValue(triggerSlot['aria-invalid']),
      'data-clearable': toDataAttributeValue(showClearIcon),
    },
    input: triggerSlot,
    listbox: open || hasFocus ? listbox : undefined,
    clearIcon: slot.optional(mergedProps.clearIcon, {
      defaultProps: { 'aria-hidden': 'true' },
      elementType: 'span',
      renderByDefault: true,
    }),
    expandIcon: useComboboxExpandIconSlot(mergedProps.expandIcon, {
      disabled,
      open,
      'aria-label': mergedProps['aria-label'],
      'aria-labelledby': mergedProps['aria-labelledby'],
      triggerLabelledBy: triggerSlot['aria-labelledby'],
    }),
    showClearIcon,
    activeDescendantController,
  };

  const openOnPointerDownRef = React.useRef(open);
  const hasExpandIconMouseDownRef = React.useRef(false);
  React.useEffect(() => {
    openOnPointerDownRef.current = open;
  }, [open]);

  const onExpandIconMouseDown = useEventCallback(
    // eslint-disable-next-line react-hooks/refs
    mergeCallbacks(state.expandIcon?.onMouseDown, (event: React.MouseEvent<HTMLSpanElement>) => {
      event.preventDefault();
      hasExpandIconMouseDownRef.current = true;
      openOnPointerDownRef.current = open;
    }),
  );

  const onExpandIconClick = useEventCallback(
    // eslint-disable-next-line react-hooks/refs
    mergeCallbacks(state.expandIcon?.onClick, (event: React.MouseEvent<HTMLSpanElement>) => {
      event.preventDefault();
      const wasOpenOnPointerDown = hasExpandIconMouseDownRef.current && openOnPointerDownRef.current;
      const nextOpen = hasExpandIconMouseDownRef.current ? !openOnPointerDownRef.current : !open;
      hasExpandIconMouseDownRef.current = false;
      openOnPointerDownRef.current = nextOpen;
      // A pointer interaction that starts while open light-dismisses the native popover on pointerup.
      // Let the popover's toggle event issue the close notification so onOpenChange fires only once.
      if (!disabled && !wasOpenOnPointerDown) {
        internalState.setOpen(event, nextOpen);
      }
      triggerRef.current?.focus();
    }),
  );

  const onExpandIconKeyDown = useEventCallback(
    // eslint-disable-next-line react-hooks/refs
    mergeCallbacks(state.expandIcon?.onKeyDown, event => {
      if (!disabled && (event.key === 'Enter' || event.key === ' ')) {
        event.preventDefault();
        const nextOpen = !open;
        openOnPointerDownRef.current = nextOpen;
        internalState.setOpen(event, nextOpen);
        triggerRef.current?.focus();
      }
    }),
  );

  if (state.expandIcon) {
    state.expandIcon.onMouseDown = onExpandIconMouseDown;
    state.expandIcon.onClick = onExpandIconClick;
    state.expandIcon.onKeyDown = onExpandIconKeyDown;
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
