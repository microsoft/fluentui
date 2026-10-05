'use client';

import type * as React from 'react';
import { slot, useMergedRefs } from '@fluentui/react-utilities';
import { useTagPickerContext_unstable } from '@fluentui/react-tag-picker';

import { Listbox } from '../../Dropdown/Listbox';
import { useListboxSlot } from '../../Dropdown/useListboxSlot';
import type { TagPickerListProps, TagPickerListState } from './TagPickerList.types';

/**
 * Returns the state for a headless TagPickerList.
 */
export const useTagPickerList = (props: TagPickerListProps, ref: React.Ref<HTMLDivElement>): TagPickerListState => {
  const triggerRef = useTagPickerContext_unstable(ctx => ctx.triggerRef) as React.RefObject<
    HTMLInputElement | HTMLButtonElement | null
  >;
  const popoverRef = useTagPickerContext_unstable(ctx => ctx.popoverRef);
  const popoverId = useTagPickerContext_unstable(ctx => ctx.popoverId);
  const open = useTagPickerContext_unstable(ctx => ctx.open);
  const setOpen = useTagPickerContext_unstable(ctx => ctx.setOpen);

  const listboxSlot = useListboxSlot(props, useMergedRefs(popoverRef, ref), {
    state: { multiselect: true, open, setOpen },
    triggerRef,
    defaultProps: { id: popoverId },
  });

  return {
    open,
    components: { root: Listbox },
    root: slot.always({ ...listboxSlot, role: 'listbox' }, { elementType: Listbox }),
  };
};
