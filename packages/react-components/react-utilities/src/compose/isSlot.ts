import { SLOT_ELEMENT_TYPE_SYMBOL } from './constants';
import { SlotComponentType } from './types';

/**
 * Guard method to ensure a given element is a slot.
 * This is mainly used internally to ensure a slot is being used as a component.
 */
export function isSlot<Props extends {}>(element: unknown): element is SlotComponentType<Props> {
  return Boolean((element as {} | undefined)?.hasOwnProperty(SLOT_ELEMENT_TYPE_SYMBOL));
}
