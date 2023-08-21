import type * as React from 'react';
import { isSlot } from '@fluentui/react-utilities';
import { jsxDEVFromSlotComponent } from './jsx/jsxDEVFromSlotComponent';
import { createCompatSlotComponent } from './utils/createCompatSlotComponent';
import { DevRuntime } from './utils/DevRuntime';

export { Fragment } from 'react';

export function jsxDEV<P extends {}>(
  type: React.ElementType<P>,
  props: P,
  key?: React.Key,
  source?: boolean,
  self?: unknown,
): React.ReactElement<P> {
  // TODO:
  // this is for backwards compatibility with getSlotsNext
  // it should be removed once getSlotsNext is obsolete
  if (isSlot<P>(props)) {
    return jsxDEVFromSlotComponent(createCompatSlotComponent(type, props), null, key, source, self);
  }
  if (isSlot<P>(type)) {
    return jsxDEVFromSlotComponent(type, props, key, source, self);
  }
  return DevRuntime.jsxDEV(type, props, key, source, self);
}
