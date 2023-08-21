import type * as React from 'react';
import { isSlot } from '@fluentui/react-utilities';
import { jsxDynamicFromSlotComponent } from './jsx/jsxDynamicFromSlotComponent';
import { jsxStaticFromSlotComponent } from './jsx/jsxStaticFromSlotComponent';
import { createCompatSlotComponent } from './utils/createCompatSlotComponent';
import { Runtime } from './utils/Runtime';

export { Fragment } from 'react';

export function jsx<P extends {}>(type: React.ElementType<P>, props: P, key?: React.Key): React.ReactElement<P> {
  // TODO:
  // this is for backwards compatibility with getSlotsNext
  // it should be removed once getSlotsNext is obsolete
  if (isSlot<P>(props)) {
    return jsxDynamicFromSlotComponent(createCompatSlotComponent(type, props), null, key);
  }
  if (isSlot<P>(type)) {
    return jsxDynamicFromSlotComponent(type, props, key);
  }
  return Runtime.jsx(type, props, key);
}

export function jsxs<P extends {}>(type: React.ElementType<P>, props: P, key?: React.Key): React.ReactElement<P> {
  // TODO:
  // this is for backwards compatibility with getSlotsNext
  // it should be removed once getSlotsNext is obsolete
  if (isSlot<P>(props)) {
    return jsxStaticFromSlotComponent(createCompatSlotComponent(type, props), null, key);
  }
  if (isSlot<P>(type)) {
    return jsxStaticFromSlotComponent(type, props, key);
  }
  return Runtime.jsxs(type, props, key);
}
