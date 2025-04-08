import { mergeClasses } from '@griffel/react';
import { SLOT_USER_CLASS_NAME_SYMBOL } from '../compose/constants';
import { UnknownSlotProps } from '../compose/types';
import { isSlot } from './isSlot';

export const overrideDefaultSlotClasses = (slot: UnknownSlotProps, ...classNames: (string | false | undefined)[]) => {
  const userClassName = isSlot(slot) ? slot[SLOT_USER_CLASS_NAME_SYMBOL] : undefined;
  slot.className = mergeClasses(slot.className, ...classNames, userClassName);
};
