import * as React from 'react';
import { isSlot } from '@fluentui/react-utilities';
import { createElementFromSlotComponent } from './jsx/createElementFromSlotComponent';
import { createCompatSlotComponent } from './utils/createCompatSlotComponent';

export function createElement<P extends {}>(
  type: React.ElementType<P>,
  props?: P | null,
  ...children: React.ReactNode[]
): React.ReactElement<P> {
  // TODO:
  // this is for backwards compatibility with getSlotsNext
  // it should be removed once getSlotsNext is obsolete
  if (isSlot<P>(props)) {
    return createElementFromSlotComponent(createCompatSlotComponent(type, props), children);
  }
  if (isSlot<P>(type)) {
    return createElementFromSlotComponent(type, children);
  }
  return React.createElement(type, props, ...children);
}
