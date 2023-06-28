import * as React from 'react';
import type { ComponentState, SlotPropsRecord, UnknownSlotProps } from './types';
import { ObjectSlotProps, Slots } from './getSlots';

/**
 * Similar to `getSlots`, main difference is that it's compatible with new custom jsx pragma
 *
 * @internal
 * This is an internal temporary method, this method will cease to exist eventually!
 *
 * * ❗️❗️ **DO NOT USE IT EXTERNALLY** ❗️❗️
 */
export function getSlotsNext<R extends SlotPropsRecord>(
  state: ComponentState<R>,
): {
  slots: Slots<R>;
  slotProps: ObjectSlotProps<R>;
} {
  const slots = {} as Slots<R>;
  const slotProps = {} as R;

  const slotNames: (keyof R)[] = Object.keys(state.components);
  for (const slotName of slotNames) {
    const [slot, props] = getSlotNext(state, slotName);
    slots[slotName] = slot as Slots<R>[typeof slotName];
    slotProps[slotName] = props;
  }
  return { slots, slotProps: slotProps as unknown as ObjectSlotProps<R> };
}

function getSlotNext<R extends SlotPropsRecord, K extends keyof R>(
  state: ComponentState<R>,
  slotName: K,
): readonly [React.ElementType<R[K]> | null, R[K]] {
  const props = state[slotName];

  if (props === undefined) {
    return [null, undefined as R[K]];
  }

  type NonUndefined<T> = T extends undefined ? never : T;
  // TS Error: Property 'as' does not exist on type 'UnknownSlotProps | undefined'.ts(2339)
  const { as: asProp, ...propsWithoutAs } = props as NonUndefined<typeof props>;

  const slot = (
    state.components?.[slotName] === undefined || typeof state.components[slotName] === 'string'
      ? asProp || state.components?.[slotName] || 'div'
      : state.components[slotName]
  ) as React.ElementType<R[K]>;

  const shouldOmitAsProp = typeof slot === 'string' && asProp;
  const slotProps: UnknownSlotProps = shouldOmitAsProp ? propsWithoutAs : props;

  return [slot, slotProps as R[K]];
}
