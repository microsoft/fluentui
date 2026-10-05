'use client';

import type * as React from 'react';
import { useTagGroupBase_unstable } from '@fluentui/react-tags';
import { useTagPickerContext_unstable } from '@fluentui/react-tag-picker';
import { isHTMLElement, useEventCallback, useMergedRefs } from '@fluentui/react-utilities';
import { ArrowRight } from '@fluentui/keyboard-keys';

import type { TagPickerGroupProps, TagPickerGroupState } from './TagPickerGroup.types';
import { toDataAttributeValue } from '../../../utils';
import { isLastFocusableTag } from '../../../utils/tagFocusUtils';

/**
 * Returns the state for a headless TagPickerGroup.
 */
export const useTagPickerGroup = (props: TagPickerGroupProps, ref: React.Ref<HTMLDivElement>): TagPickerGroupState => {
  const hasSelectedOptions = useTagPickerContext_unstable(ctx => ctx.selectedOptions.length > 0);
  const hasOneSelectedOption = useTagPickerContext_unstable(ctx => ctx.selectedOptions.length === 1);
  const triggerRef = useTagPickerContext_unstable(ctx => ctx.triggerRef);
  const tagPickerGroupRef = useTagPickerContext_unstable(ctx => ctx.tagPickerGroupRef);
  const selectOption = useTagPickerContext_unstable(ctx => ctx.selectOption);
  const disabled = useTagPickerContext_unstable(ctx => ctx.disabled);

  const state: Omit<TagPickerGroupState, 'hasSelectedOptions'> = useTagGroupBase_unstable(
    {
      disabled,
      dismissible: true,
      ...props,
      onKeyDown: useEventCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
        props.onKeyDown?.(event);
        if (
          isHTMLElement(event.target) &&
          event.key === ArrowRight &&
          isLastFocusableTag(event.currentTarget, event.target)
        ) {
          triggerRef.current?.focus();
        }
      }),
      onDismiss: useEventCallback((event, data) => {
        props.onDismiss?.(event, data);
        selectOption(event as React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>, {
          value: data.value,
          // These values no longer exist because the option has unregistered itself
          // for the purposes of selection - these values aren't actually used
          id: 'ERROR_DO_NOT_USE',
          text: 'ERROR_DO_NOT_USE',
        });
        if (hasOneSelectedOption && !event.isDefaultPrevented()) {
          triggerRef.current?.focus();
        }
      }),
    },
    useMergedRefs(ref, tagPickerGroupRef),
  );

  /* eslint-disable react-hooks/immutability -- swap Tabster arrow-nav for the native focusgroup + surface disabled as data-* */
  state.root.focusgroup = 'toolbar inline wrap';
  state.root['data-disabled'] = toDataAttributeValue(disabled);
  /* eslint-enable react-hooks/immutability */

  return { ...state, hasSelectedOptions };
};
