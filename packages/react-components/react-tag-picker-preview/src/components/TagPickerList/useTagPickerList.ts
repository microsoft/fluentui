import * as React from 'react';
import type { TagPickerListProps, TagPickerListState } from './TagPickerList.types';
import { Listbox } from '@fluentui/react-combobox';
import { useTagPickerContext_unstable } from '../../contexts/TagPickerContext';
import { slot, useMergedRefs } from '@fluentui/react-utilities';
import { useListboxSlot } from '@fluentui/react-combobox';

/**
 * Create the state required to render TagPickerList.
 *
 * The returned state can be modified with hooks such as useTagPickerListStyles_unstable,
 * before being passed to renderTagPickerList_unstable.
 *
 * @param props - props from this instance of TagPickerList
 * @param ref - reference to root HTMLDivElement of TagPickerList
 */
export const useTagPickerList_unstable = (
  props: TagPickerListProps,
  ref: React.Ref<HTMLDivElement>,
): TagPickerListState => {
  const triggerRef = useTagPickerContext_unstable(ctx => ctx.triggerRef) as
    | React.RefObject<HTMLInputElement>
    | React.RefObject<HTMLButtonElement>;
  const popoverRef = useTagPickerContext_unstable(ctx => ctx.popoverRef);
  const popoverId = useTagPickerContext_unstable(ctx => ctx.popoverId);
  const open = useTagPickerContext_unstable(ctx => ctx.open);

  return {
    open,
    components: {
      root: Listbox,
    },
    root: slot.always(
      {
        ...useListboxSlot(props, useMergedRefs(popoverRef, ref), {
          state: { multiselect: true },
          triggerRef,
          defaultProps: { id: popoverId },
        }),
        role: 'listbox',
      },
      { elementType: Listbox },
    ),
  };
};
