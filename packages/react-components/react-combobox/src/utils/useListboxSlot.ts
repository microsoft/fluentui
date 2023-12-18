import * as React from 'react';
import { mergeCallbacks, useId, useEventCallback } from '@fluentui/react-utilities';
import type { ExtractSlotProps, Slot } from '@fluentui/react-utilities';
import { Listbox } from '../components/Listbox/Listbox';
import type { ComboboxBaseState } from './ComboboxBase.types';

export type UseTriggerSlotState = Pick<ComboboxBaseState, 'multiselect'>;

/**
 * @returns  listbox slot with desired behaviour and props
 */
export function useListboxSlot(
  state: ComboboxBaseState,
  listboxSlot: ExtractSlotProps<Slot<typeof Listbox>> | undefined,
  triggerRef: React.RefObject<HTMLInputElement> | React.RefObject<HTMLButtonElement>,
): ExtractSlotProps<Slot<typeof Listbox>> {
  const { multiselect } = state;

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

  const listboxId = useId('fluent-listbox', listboxSlot?.id);
  const listbox: typeof listboxSlot = {
    id: listboxId,
    multiselect,
    tabIndex: undefined,
    ...listboxSlot,
    onMouseDown,
    onClick,
  };

  return listbox;
}
