import * as React from 'react';
import type { TagPickerGroupProps, TagPickerGroupState } from './TagPickerGroup.types';
import { useTagGroup_unstable } from '@fluentui/react-tags';
import { useTagPickerContext_unstable } from '../../contexts/TagPickerContext';
import { isHTMLElement, useEventCallback, useMergedRefs } from '@fluentui/react-utilities';
import { tagPickerAppearanceToTagAppearance, tagPickerSizeToTagSize } from '../../utils/tagPicker2Tag';
import { useArrowNavigationGroup } from '@fluentui/react-tabster';
import { ArrowRight } from '@fluentui/keyboard-keys';

/**
 * Create the state required to render TagPickerGroup.
 *
 * The returned state can be modified with hooks such as usePickerTagGroupStyles_unstable,
 * before being passed to renderPickerTagGroup_unstable.
 *
 * @param props - props from this instance of TagPickerGroup
 * @param ref - reference to root HTMLDivElement of TagPickerGroup
 */
export const useTagPickerGroup_unstable = (
  props: TagPickerGroupProps,
  ref: React.Ref<HTMLDivElement>,
): TagPickerGroupState => {
  const hasSelectedOptions = useTagPickerContext_unstable(ctx => ctx.selectedOptions.length > 0);
  const hasOneSelectedOption = useTagPickerContext_unstable(ctx => ctx.selectedOptions.length === 1);
  const triggerRef = useTagPickerContext_unstable(ctx => ctx.triggerRef);
  const tagPickerGroupRef = useTagPickerContext_unstable(ctx => ctx.tagPickerGroupRef);
  const selectOption = useTagPickerContext_unstable(ctx => ctx.selectOption);
  const size = useTagPickerContext_unstable(ctx => tagPickerSizeToTagSize(ctx.size));
  const appearance = useTagPickerContext_unstable(ctx => ctx.appearance);

  const arrowNavigationProps = useArrowNavigationGroup({
    circular: false,
    axis: 'both',
    memorizeCurrent: true,
  });

  const state = useTagGroup_unstable(
    {
      role: 'listbox',
      ...props,
      ...arrowNavigationProps,
      size,
      appearance: tagPickerAppearanceToTagAppearance(appearance),
      dismissible: true,
      onKeyDown: useEventCallback(event => {
        props.onKeyDown?.(event);
        if (isHTMLElement(event.target) && event.key === ArrowRight) {
          triggerRef.current?.focus();
        }
      }),
      onDismiss: useEventCallback((event, data) => {
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

  return {
    ...state,
    hasSelectedOptions,
  };
};
