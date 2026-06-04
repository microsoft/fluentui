'use client';

import type * as React from 'react';
import { useEventCallback } from '@fluentui/react-utilities';
import { ArrowLeft, Backspace } from '@fluentui/keyboard-keys';
import { useTagPickerContext_unstable, useTagPickerInputBase_unstable } from '@fluentui/react-tag-picker';

import type { TagPickerInputProps, TagPickerInputState } from './TagPickerInput.types';
import { stringifyDataAttribute } from '../../../utils/stringifyDataAttribute';

/**
 * Returns the state for a headless TagPickerInput.
 */
export const useTagPickerInput = (
  props: TagPickerInputProps,
  ref: React.Ref<HTMLInputElement>,
): TagPickerInputState => {
  const tagPickerGroupRef = useTagPickerContext_unstable(ctx => ctx.tagPickerGroupRef);

  const onKeyDown = useEventCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
    props.onKeyDown?.(event);
    if (
      (event.key === ArrowLeft || event.key === Backspace) &&
      event.currentTarget.selectionStart === 0 &&
      event.currentTarget.selectionEnd === 0 &&
      tagPickerGroupRef.current
    ) {
      focusLastTag(tagPickerGroupRef.current);
    }
  });

  const state: TagPickerInputState = useTagPickerInputBase_unstable({ ...props, onKeyDown }, ref);

  // eslint-disable-next-line react-hooks/immutability -- decorate base state with data-* attribute
  state.root['data-disabled'] = stringifyDataAttribute(state.disabled);

  return state;
};

/**
 * Moves focus to the last focusable element within the tag group. The focusgroup polyfill
 * manages roving `tabindex` on the tags, so the items carry `tabindex="-1"`; they remain
 * programmatically focusable, which is why we don't filter on `tabindex`.
 */
function focusLastTag(container: HTMLElement): void {
  const focusable = container.querySelectorAll<HTMLElement>('button, [tabindex]');
  focusable[focusable.length - 1]?.focus();
}
