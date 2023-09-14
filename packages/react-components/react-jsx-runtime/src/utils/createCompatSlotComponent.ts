import * as React from 'react';
import { SLOT_ELEMENT_TYPE_SYMBOL } from '@fluentui/react-utilities';
import type { SlotComponentType } from '@fluentui/react-utilities';

// TODO:
// this is for backwards compatibility with getSlotsNext
// it should be removed once getSlotsNext is obsolete
export function createCompatSlotComponent<P extends {}>(type: React.ElementType<P>, props: P): SlotComponentType<P> {
  return {
    ...props,
    [SLOT_ELEMENT_TYPE_SYMBOL]: type,
  } as SlotComponentType<P>;
}
