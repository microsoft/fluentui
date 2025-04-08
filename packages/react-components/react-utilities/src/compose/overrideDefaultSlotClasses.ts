import { mergeClasses } from '@griffel/react';
import { SLOT_ORIGINAL_CLASS_NAME_SYMBOL } from '../compose/constants';
import type { SlotComponentType, UnknownSlotProps } from '../compose/types';

export const overrideDefaultSlotClasses = (slot: UnknownSlotProps, ...classNames: (string | false | undefined)[]) => {
  slot.className = mergeClasses(
    slot.className,
    ...classNames,
    (slot as SlotComponentType<UnknownSlotProps>)[SLOT_ORIGINAL_CLASS_NAME_SYMBOL],
  );
};
