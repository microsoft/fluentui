import { SLOT_ORIGINAL_CLASS_NAME_SYMBOL } from '../compose/constants';
import type { UnknownSlotProps } from '../compose/types';

export const getSlotClassNameProp = (slot: UnknownSlotProps) => {
  if (SLOT_ORIGINAL_CLASS_NAME_SYMBOL in slot && typeof slot[SLOT_ORIGINAL_CLASS_NAME_SYMBOL] === 'string') {
    return slot[SLOT_ORIGINAL_CLASS_NAME_SYMBOL];
  }
  return undefined;
};
