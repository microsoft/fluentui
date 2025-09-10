import * as React from 'react';
import type { ComponentState, SlotPropsRecord, UnknownSlotProps } from '../types';
import { ObjectSlotProps, Slots } from './getSlots';

/**
 * Similar to `getSlots`, main difference is that it's compatible with new custom jsx pragma
 *
 * @internal
 * This is an internal temporary method, this method will cease to exist eventually!
 *
 * * ❗️❗️ **DO NOT USE IT EXTERNALLY** ❗️❗️
 *
 * @deprecated use slot.always or slot.optional combined with assertSlots instead
 */
export function getSlotsNext<R extends SlotPropsRecord>(
  state: unknown,
): {
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  slots: Slots<R>;
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  slotProps: ObjectSlotProps<R>;
} {
  const typedState = state as ComponentState<R>;
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  const slots = {} as Slots<R>;
  const slotProps = {} as R;

  // eslint-disable-next-line @typescript-eslint/no-deprecated
  const slotNames: (keyof R)[] = Object.keys(typedState.components);
  for (const slotName of slotNames) {
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    const [slot, props] = getSlotNext(typedState, slotName);
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    slots[slotName] = slot as Slots<R>[typeof slotName];
    slotProps[slotName] = props;
  }
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  return { slots, slotProps: slotProps as unknown as ObjectSlotProps<R> };
}

/**
 * @deprecated use slot.always or slot.optional combined with assertSlots instead
 */
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
    state.components?.[slotName] === undefined || // eslint-disable-line @typescript-eslint/no-deprecated
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    typeof state.components[slotName] === 'string'
      ? // eslint-disable-next-line @typescript-eslint/no-deprecated
        asProp || state.components?.[slotName] || 'div'
      : // eslint-disable-next-line @typescript-eslint/no-deprecated
        state.components[slotName]
  ) as React.ElementType<R[K]>;

  const shouldOmitAsProp = typeof slot === 'string' && asProp;
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  const slotProps: UnknownSlotProps = shouldOmitAsProp ? propsWithoutAs : props;

  return [slot as React.ElementType<R[K]>, slotProps as R[K]];
}
