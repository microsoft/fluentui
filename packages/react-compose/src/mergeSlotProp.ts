import { SlotProp } from './types';
import * as React from 'react';

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
