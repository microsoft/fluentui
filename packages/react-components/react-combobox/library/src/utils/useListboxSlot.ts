import * as React from 'react';
import {
  mergeCallbacks,
  useId,
  useEventCallback,
  slot,
  isResolvedShorthand,
  useMergedRefs,
} from '@fluentui/react-utilities';
import type { ExtractSlotProps, Slot, SlotComponentType } from '@fluentui/react-utilities';
import type { ComboboxBaseState } from './ComboboxBase.types';
import { Listbox } from '../Listbox';
import { ListboxProps } from '../Listbox';

export type UseListboxSlotState = Pick<ComboboxBaseState, 'multiselect'>;

type UseListboxSlotOptions = {
  state: UseListboxSlotState;
  triggerRef:
    | React.RefObject<HTMLInputElement>
    | React.RefObject<HTMLButtonElement>
    | React.RefObject<HTMLButtonElement | HTMLInputElement>;
  defaultProps?: Partial<ListboxProps>;
};

/**
 * @internal
 * @returns  listbox slot with desired behaviour and props
 */
export function useListboxSlot(
  listboxSlotFromProp: Slot<typeof Listbox> | undefined,
  ref: React.Ref<HTMLDivElement>,
  options: UseListboxSlotOptions,
): SlotComponentType<ExtractSlotProps<Slot<typeof Listbox>>> | undefined {
  const {
    state: { multiselect },
    triggerRef,
    defaultProps,
  } = options;

  const listboxId = useId(
    'fluent-listbox',
    isResolvedShorthand(listboxSlotFromProp) ? listboxSlotFromProp.id : undefined,
  );

  const listboxSlot = slot.optional(listboxSlotFromProp, {
    renderByDefault: true,
    elementType: Listbox,
    defaultProps: {
      id: listboxId,
      multiselect,
      tabIndex: undefined,
      ...defaultProps,
    },
  });

  /**
   * Clicking on the listbox should never blur the trigger
   * in a combobox
   */
  const onMouseDown = useEventCallback(
    mergeCallbacks((event: React.MouseEvent<HTMLDivElement>) => {
      event.preventDefault();
    }, listboxSlot?.onMouseDown),
  );

  const onClick = useEventCallback(
    mergeCallbacks((event: React.MouseEvent<HTMLDivElement>) => {
      event.preventDefault();
      triggerRef.current?.focus();
    }, listboxSlot?.onClick),
  );

  const listboxRef = useMergedRefs(listboxSlot?.ref, ref);
  if (listboxSlot) {
    listboxSlot.ref = listboxRef;
    listboxSlot.onMouseDown = onMouseDown;
    listboxSlot.onClick = onClick;
  }

  return listboxSlot;
}
