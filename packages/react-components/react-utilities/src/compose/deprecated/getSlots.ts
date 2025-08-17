import * as React from 'react';
import { omit } from '../../utils/omit';
import type { ComponentState, SlotPropsRecord, SlotRenderFunction, UnknownSlotProps } from '../types';
import { isSlot } from '../isSlot';
import { SLOT_RENDER_FUNCTION_SYMBOL } from '../constants';

/**
 * @deprecated - use slot.always or slot.optional combined with assertSlots instead
 */
export type Slots<S extends SlotPropsRecord> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [K in keyof S]: React.ElementType<any>;
};

/**
 * @deprecated - use slot.always or slot.optional combined with assertSlots instead
 */
export type ObjectSlotProps<S extends SlotPropsRecord> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [K in keyof S]-?: any;
};

/**
 * Given the state and an array of slot names, will break out `slots` and `slotProps`
 * collections.
 *
 * The root is derived from a mix of `components` props and `as` prop.
 *
 * Slots will render as null if they are rendered as primitives with undefined children.
 *
 * The slotProps will always omit the `as` prop within them, and for slots that are string
 * primitives, the props will be filtered according to the slot type by the type system.
 * For example, if the slot is rendered `as: 'a'`, the props will be filtered for acceptable
 * anchor props. Note that this is only enforced at build time by Typescript -- there is no
 * runtime code filtering props in this function.
 *
 * @deprecated use slot.always or slot.optional combined with assertSlots instead
 *
 * @param state - State including slot definitions
 * @returns An object containing the `slots` map and `slotProps` map.
 */
export function getSlots<R extends SlotPropsRecord>(
  state: unknown,
): {
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  slots: Slots<R>;
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  slotProps: ObjectSlotProps<R>;
} {
  const typeState = state as ComponentState<R>;
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  const slots = {} as Slots<R>;
  const slotProps = {} as R;

  // eslint-disable-next-line @typescript-eslint/no-deprecated
  const slotNames: (keyof R)[] = Object.keys(typeState.components);
  for (const slotName of slotNames) {
    const [slot, props] = getSlot(typeState, slotName);
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    slots[slotName] = slot as Slots<R>[typeof slotName];
    slotProps[slotName] = props;
  }
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  return { slots, slotProps: slotProps as unknown as ObjectSlotProps<R> };
}

function getSlot<R extends SlotPropsRecord, K extends keyof R>(
  state: ComponentState<R>,
  slotName: K,
): readonly [React.ElementType<R[K]> | null, R[K]] {
  const props = state[slotName];

  if (props === undefined) {
    return [null, undefined as R[K]];
  }

  type NonUndefined<T> = T extends undefined ? never : T;
  // TS Error: Property 'as' does not exist on type 'UnknownSlotProps | undefined'.ts(2339)
  const { as: asProp, children, ...rest } = props as NonUndefined<typeof props>;

  const renderFunction = isSlot(props) ? props[SLOT_RENDER_FUNCTION_SYMBOL] : undefined;

  const slot = (
    state.components?.[slotName] === undefined || // eslint-disable-line @typescript-eslint/no-deprecated
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    typeof state.components[slotName] === 'string'
      ? // eslint-disable-next-line @typescript-eslint/no-deprecated
        asProp || state.components?.[slotName] || 'div'
      : // eslint-disable-next-line @typescript-eslint/no-deprecated
        state.components[slotName]
  ) as React.ElementType<R[K]>;

  const asserted = slot as React.ElementType<R[K]>;

  if (renderFunction || typeof children === 'function') {
    const render = (renderFunction || children) as SlotRenderFunction<R[K]>;
    return [
      React.Fragment as React.ElementType<R[K]>,
      {
        children: render(asserted, rest as Omit<R[K], 'as'>),
      } as unknown as R[K],
    ];
  }

  const shouldOmitAsProp = typeof slot === 'string' && asProp;
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  const slotProps = (shouldOmitAsProp ? omit(props, ['as']) : (props as UnknownSlotProps)) as R[K];
  return [asserted, slotProps];
}
