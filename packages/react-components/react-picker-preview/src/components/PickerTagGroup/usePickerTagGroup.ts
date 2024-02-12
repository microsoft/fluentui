import * as React from 'react';
import type { PickerTagGroupProps, PickerTagGroupState } from './PickerTagGroup.types';
import { useTagGroup_unstable } from '@fluentui/react-tags';
import { usePickerContext_unstable } from '../../contexts/PickerContext';
import { useEventCallback } from '@fluentui/react-utilities';

/**
 * Create the state required to render PickerTagGroup.
 *
 * The returned state can be modified with hooks such as usePickerTagGroupStyles_unstable,
 * before being passed to renderPickerTagGroup_unstable.
 *
 * @param props - props from this instance of PickerTagGroup
 * @param ref - reference to root HTMLDivElement of PickerTagGroup
 */
export const usePickerTagGroup_unstable = (
  props: PickerTagGroupProps,
  ref: React.Ref<HTMLDivElement>,
): PickerTagGroupState => {
  const selectedOptions = usePickerContext_unstable(ctx => ctx.selectedOptions);
  const selectOption = usePickerContext_unstable(ctx => ctx.selectOption);

  const state = useTagGroup_unstable(
    {
      ...props,
      onDismiss: useEventCallback((e, data) => {
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
