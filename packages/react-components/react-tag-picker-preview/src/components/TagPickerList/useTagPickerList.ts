import * as React from 'react';
import type { TagPickerListProps, TagPickerListState } from './TagPickerList.types';
import { Listbox } from '@fluentui/react-combobox';
import { useTagPickerContext_unstable } from '../../contexts/TagPickerContext';
import { useMergedRefs } from '@fluentui/react-utilities';
import { useListboxSlot } from '../../utils/useListboxSlot';

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
  const multiselect = useTagPickerContext_unstable(ctx => ctx.multiselect);
  const triggerRef = useTagPickerContext_unstable(ctx => ctx.triggerRef);
  const popoverRef = useTagPickerContext_unstable(ctx => ctx.popoverRef);
  const popoverId = useTagPickerContext_unstable(ctx => ctx.popoverId);
  const open = useTagPickerContext_unstable(ctx => ctx.open);

  return {
    open,
    components: {
      root: Listbox,
    },
    root: useListboxSlot(props, useMergedRefs(popoverRef, ref), {
      state: { multiselect },
      triggerRef,
      defaultProps: { id: popoverId },
      // FIXME: This is a workaround for the fact that useListboxSlot is not properly typed
    })!,
  };
};
