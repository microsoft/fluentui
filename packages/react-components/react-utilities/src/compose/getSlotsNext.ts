import * as React from 'react';
import type { ComponentState, NextComponentState, SlotPropsRecord, UnknownSlotProps } from './types';
import { ObjectSlotProps, Slots } from './getSlots';

/**
 * Similar to `getSlots`, main difference is that it's compatible with new custom jsx pragma
 */
export function getSlotsNext<R extends SlotPropsRecord>(
  state: ComponentState<R>,
): {
  slots: Slots<R>;
  slotProps: ObjectSlotProps<R>;
} {
  const nextState = state as NextComponentState<R>;
  const slots = {} as Slots<R>;
  const slotProps = {} as R;

  // eslint-disable-next-line deprecation/deprecation
  const slotNames: (keyof R)[] = Object.keys(nextState.components);
  for (const slotName of slotNames) {
    const [slot, props] = getSlotNext(nextState, slotName);
    slots[slotName] = slot as Slots<R>[typeof slotName];
    slotProps[slotName] = props;
  }
  return { slots, slotProps: slotProps as unknown as ObjectSlotProps<R> };
}

function getSlotNext<R extends SlotPropsRecord, K extends keyof R>(
  state: NextComponentState<R>,
  slotName: K,
): readonly [React.ElementType<R[K]> | null, R[K]] {
  const props = state[slotName];

  if (props === undefined) {
    return [null, undefined as R[K]];
  }
  const { as: asProp, ...propsWithoutAs } = props;

  /* eslint-disable deprecation/deprecation */
  const slot = (
    state.components?.[slotName] === undefined || typeof state.components[slotName] === 'string'
      ? asProp || state.components?.[slotName] || 'div'
      : state.components[slotName]
  ) as React.ElementType<R[K]>;
  /* eslint-enable deprecation/deprecation */

  const shouldOmitAsProp = typeof slot === 'string' && asProp;
  const slotProps: UnknownSlotProps = shouldOmitAsProp ? propsWithoutAs : props;

  return [slot, slotProps as R[K]];
}
