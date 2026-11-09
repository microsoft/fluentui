'use client';

import * as React from 'react';
import { useTagPickerContext_unstable, useTagPickerControlBase_unstable } from '@fluentui/react-tag-picker';
import { elementContains, useEventCallback, useMergedRefs } from '@fluentui/react-utilities';

import type { TagPickerControlProps, TagPickerControlState } from './TagPickerControl.types';
import { toDataAttributeValue } from '../../../utils/toDataAttributeValue';

/**
 * Returns the state for a headless TagPickerControl.
 *
 * Wraps {@link useTagPickerControlBase_unstable} (which omits `size`/`appearance`) and
 * exposes the disabled/invalid state as `data-*` attributes for styling hooks.
 */
export const useTagPickerControl = (
  props: TagPickerControlProps,
  ref: React.Ref<HTMLDivElement>,
): TagPickerControlState => {
  const state: TagPickerControlState = useTagPickerControlBase_unstable(props, ref);

  const open = useTagPickerContext_unstable(ctx => ctx.open);
  const setOpen = useTagPickerContext_unstable(ctx => ctx.setOpen);
  const triggerRef = useTagPickerContext_unstable(ctx => ctx.triggerRef);
  const tagPickerGroupRef = useTagPickerContext_unstable(ctx => ctx.tagPickerGroupRef);

  const expandIconRef = React.useRef<HTMLSpanElement>(null);
  const asideRef = React.useRef<HTMLSpanElement>(null);
  const expandIconMergedRef = useMergedRefs(state.expandIcon?.ref, expandIconRef);
  const asideMergedRef = useMergedRefs(state.aside?.ref, asideRef);
  // Whether the current gesture started on the control, so a drag from the input does not toggle.
  const toggleOnClick = React.useRef(false);

  const isToggleTarget = (event: React.MouseEvent<HTMLDivElement>) =>
    event.target === event.currentTarget ||
    event.target === tagPickerGroupRef.current ||
    event.target === asideRef.current ||
    elementContains(expandIconRef.current, event.target as Node);

  // The list is a native `popover="auto"`: opening it on mouse down, as the base hook does, lets the browser
  // light-dismiss it on the pointer up of the same gesture. Keep focus on mouse down and toggle on click instead.
  const onMouseDown = useEventCallback((event: React.MouseEvent<HTMLDivElement>) => {
    props.onMouseDown?.(event);
    toggleOnClick.current = !event.defaultPrevented && isToggleTarget(event);
    if (toggleOnClick.current) {
      event.preventDefault();
      triggerRef.current?.focus();
    }
  });

  const onClick = useEventCallback((event: React.MouseEvent<HTMLDivElement>) => {
    props.onClick?.(event);
    if (toggleOnClick.current && !event.defaultPrevented && isToggleTarget(event)) {
      setOpen(event, !open);
    }
    toggleOnClick.current = false;
  });

  /* eslint-disable react-hooks/immutability -- decorate base state with click toggling and data-* attributes */
  state.root.onMouseDown = onMouseDown;
  state.root.onClick = onClick;
  if (state.expandIcon) {
    state.expandIcon.ref = expandIconMergedRef;
  }
  if (state.aside) {
    state.aside.ref = asideMergedRef;
  }
  state.root['data-disabled'] = toDataAttributeValue(state.disabled);
  state.root['data-invalid'] = toDataAttributeValue(state.invalid);
  /* eslint-enable react-hooks/immutability */

  return state;
};
