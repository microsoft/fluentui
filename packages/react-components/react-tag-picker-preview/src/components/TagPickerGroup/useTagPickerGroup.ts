import * as React from 'react';
import type { TagPickerGroupProps, TagPickerGroupState } from './TagPickerGroup.types';
import { useTagGroup_unstable } from '@fluentui/react-tags';
import { useTagPickerContext_unstable } from '../../contexts/TagPickerContext';
import { useEventCallback } from '@fluentui/react-utilities';

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
  const selectedOptions = useTagPickerContext_unstable(ctx => ctx.selectedOptions);
  const hasOneSelectedOption = useTagPickerContext_unstable(ctx => ctx.selectedOptions.length === 1);
  const triggerRef = useTagPickerContext_unstable(ctx => ctx.triggerRef);
  const selectOption = useTagPickerContext_unstable(ctx => ctx.selectOption);
  const tagSize = useTagPickerContext_unstable(ctx => {
    switch (ctx.size) {
      case 'medium':
        return 'extra-small';
      case 'large':
        return 'small';
      case 'extra-large':
        return 'medium';
      default:
        return 'extra-small';
    }
  });

  const state = useTagGroup_unstable(
    {
      ...props,
      size: tagSize,
      onClick: e => {
        // Prevent default so that open/close state is not affected
        // target check is to make sure that this only applies to white space in this control and not to tags
        if (e.target !== e.currentTarget) {
          e.preventDefault();
        }
      },
      onDismiss: useEventCallback((e, data) => {
        if (hasOneSelectedOption) {
          triggerRef.current?.focus();
        }
        selectOption(e as React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>, {
          value: data.value,
          // These values no longer exist because the option has unregistered itself
          // for the purposes of selection - these values aren't actually used
          id: 'ERROR_DO_NOT_USE',
          text: 'ERROR_DO_NOT_USE',
        });
      }),
    },
    ref,
  );

  return {
    ...state,
    hasSelectedOptions: !!selectedOptions.length,
  };
};
