import * as React from 'react';
import type { TagPickerGroupProps, TagPickerGroupState } from './TagPickerGroup.types';
import { useTagGroup } from '@fluentui/react-tags';
import { useTagPickerContext } from '../../contexts/TagPickerContext';
import { useEventCallback, useMergedRefs } from '@fluentui/react-utilities';
import { tagPickerAppearanceToTagAppearance, tagPickerSizeToTagSize } from '../../utils/tagPicker2Tag';

/**
 * Create the state required to render TagPickerGroup.
 *
 * The returned state can be modified with hooks such as usePickerTagGroupStyles,
 * before being passed to renderPickerTagGroup.
 *
 * @param props - props from this instance of TagPickerGroup
 * @param ref - reference to root HTMLDivElement of TagPickerGroup
 */
export const useTagPickerGroup = (props: TagPickerGroupProps, ref: React.Ref<HTMLDivElement>): TagPickerGroupState => {
  const selectedOptions = useTagPickerContext(ctx => ctx.selectedOptions);
  const hasOneSelectedOption = useTagPickerContext(ctx => ctx.selectedOptions.length === 1);
  const triggerRef = useTagPickerContext(ctx => ctx.triggerRef);
  const tagPickerGroupRef = useTagPickerContext(ctx => ctx.tagPickerGroupRef);
  const selectOption = useTagPickerContext(ctx => ctx.selectOption);
  const size = useTagPickerContext(ctx => tagPickerSizeToTagSize(ctx.size));
  const appearance = useTagPickerContext(ctx => ctx.appearance);

  const state = useTagGroup(
    {
      ...props,
      size,
      appearance: tagPickerAppearanceToTagAppearance(appearance),
      dismissible: true,
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
    hasSelectedOptions: !!selectedOptions.length,
  };
};
