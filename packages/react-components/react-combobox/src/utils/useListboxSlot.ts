import * as React from 'react';
import { mergeCallbacks, useId, useEventCallback } from '@fluentui/react-utilities';
import type { ExtractSlotProps, Slot } from '@fluentui/react-utilities';
import { Listbox } from '../components/Listbox/Listbox';
import type { ComboboxBaseProps } from './ComboboxBase.types';

/**
 * @returns  listbox slot with desired behaviour and props
 */
export function useListboxSlot(
  props: ComboboxBaseProps,
  listboxSlot: ExtractSlotProps<Slot<typeof Listbox>> | undefined,
  triggerRef: React.RefObject<HTMLInputElement> | React.RefObject<HTMLButtonElement>,
): ExtractSlotProps<Slot<typeof Listbox>> {
  const { multiselect } = props;

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

  // resolve listbox shorthand props
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
