import { SlotProp } from './types';
import * as React from 'react';

/**
 * Merge props for a slot to a slot prop.
 * @param slotProp - Slot prop.
 * @param slotProps - Props for the slot.
 * @param mappedProp - Optional mapped prop name for the slotProp after merging.
 */
export function mergeSlotProp<TProps>(
  slotProp: SlotProp<TProps>,
  slotProps: TProps,
  mappedProp: string = 'children',
): SlotProp<TProps> {
  if (typeof slotProp === 'object' && !React.isValidElement(slotProp)) {
    return {
      ...slotProp,
      ...slotProps,
    };
  } else {
    return {
      [mappedProp]: slotProp,
      ...slotProps,
    };
  }
}
