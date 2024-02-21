import * as React from 'react';
import type { PickerListProps, PickerListState } from './PickerList.types';
import { Listbox, useListboxSlot } from '@fluentui/react-combobox';
import { usePickerContext_unstable } from '../../contexts/PickerContext';
import { useMergedRefs } from '@fluentui/react-utilities';

/**
 * Create the state required to render PickerList.
 *
 * The returned state can be modified with hooks such as usePickerListStyles_unstable,
 * before being passed to renderPickerList_unstable.
 *
 * @param props - props from this instance of PickerList
 * @param ref - reference to root HTMLDivElement of PickerList
 */
export const usePickerList_unstable = (props: PickerListProps, ref: React.Ref<HTMLDivElement>): PickerListState => {
  const multiselect = usePickerContext_unstable(ctx => ctx.multiselect);
  const triggerRef = usePickerContext_unstable(ctx => ctx.triggerRef) as
    | React.RefObject<HTMLInputElement>
    | React.RefObject<HTMLButtonElement>;
  const popoverRef = usePickerContext_unstable(ctx => ctx.popoverRef);
  const open = usePickerContext_unstable(ctx => ctx.open);
  const hasFocus = usePickerContext_unstable(ctx => ctx.hasFocus);
  const popoverId = usePickerContext_unstable(ctx => ctx.popoverId);

  const root = useListboxSlot(props, useMergedRefs(popoverRef, ref), {
    state: { multiselect },
    triggerRef,
    defaultProps: { id: popoverId },
  });

  return {
    components: {
      root: Listbox,
    },
    root: open || hasFocus ? root : undefined,
    open,
  };
};
