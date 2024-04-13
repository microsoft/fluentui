import * as React from 'react';
import type { TagPickerListProps, TagPickerListState } from './TagPickerList.types';
import { Listbox } from '@fluentui/react-combobox';
import { useTagPickerContext } from '../../contexts/TagPickerContext';
import { useMergedRefs } from '@fluentui/react-utilities';
import { useListboxSlot } from '@fluentui/react-combobox';

/**
 * Create the state required to render TagPickerList.
 *
 * The returned state can be modified with hooks such as useTagPickerListStyles,
 * before being passed to renderTagPickerList.
 *
 * @param props - props from this instance of TagPickerList
 * @param ref - reference to root HTMLDivElement of TagPickerList
 */
export const useTagPickerList = (props: TagPickerListProps, ref: React.Ref<HTMLDivElement>): TagPickerListState => {
  const multiselect = useTagPickerContext(ctx => ctx.multiselect);
  const triggerRef = useTagPickerContext(ctx => ctx.triggerRef) as
    | React.RefObject<HTMLInputElement>
    | React.RefObject<HTMLButtonElement>;
  const popoverRef = useTagPickerContext(ctx => ctx.popoverRef);
  const popoverId = useTagPickerContext(ctx => ctx.popoverId);
  const open = useTagPickerContext(ctx => ctx.open);

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
