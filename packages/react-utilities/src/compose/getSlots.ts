import * as React from 'react';

import { omit } from '../utils/omit';
import type {
  AsIntrinsicElement,
  ComponentState,
  ExtractSlotProps,
  SlotPropsRecord,
  SlotRenderFunction,
  UnionToIntersection,
} from './types';

export type Slots<S extends SlotPropsRecord> = {
  [K in keyof S]: ExtractSlotProps<S[K]> extends AsIntrinsicElement<infer As>
    ? // for slots with an `as` prop, the slot will be any one of the possible values of `as`
      As
    : ExtractSlotProps<S[K]> extends React.ComponentType<infer P>
    ? React.ElementType<NonNullable<P>>
    : React.ElementType<ExtractSlotProps<S[K]>>;
};

type ObjectSlotProps<S extends SlotPropsRecord> = {
  [K in keyof S]-?: ExtractSlotProps<S[K]> extends AsIntrinsicElement<infer As>
    ? // For intrinsic element types, return the intersection of all possible
      // element's props, to be compatible with the As type returned by Slots<>
      UnionToIntersection<JSX.IntrinsicElements[As]>
    : ExtractSlotProps<S[K]> extends React.ComponentType<infer P>
    ? P
    : never;
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
 * @param state - State including slot definitions
 * @returns An object containing the `slots` map and `slotProps` map.
 */
export function getSlots<R extends SlotPropsRecord>(
  state: ComponentState<R>,
): {
  slots: Slots<R>;
  slotProps: ObjectSlotProps<R>;
} {
  const slots = {} as Slots<R>;
  const slotProps = {} as R;

  const slotNames: (keyof R)[] = Object.keys(state.components);
  for (const slotName of slotNames) {
    const [slot, props] = getSlot(state, slotName);
    slots[slotName] = slot as Slots<R>[typeof slotName];
    slotProps[slotName] = props;
  }
  return { slots, slotProps: (slotProps as unknown) as ObjectSlotProps<R> };
}

function getSlot<R extends SlotPropsRecord, K extends keyof R>(
  state: ComponentState<R>,
  slotName: K,
): readonly [React.ElementType<R[K]> | null, R[K]] {
  if (state[slotName] === undefined) {
    return [null, undefined as R[K]];
  }
  const { children, as: asProp, ...rest } = state[slotName]!;

  const slot = (state.components?.[slotName] === undefined || typeof state.components[slotName] === 'string'
    ? asProp || state.components?.[slotName] || 'div'
    : state.components[slotName]) as React.ElementType<R[K]>;

  if (typeof children === 'function') {
    const render = children as SlotRenderFunction<R[K]>;
    return [
      React.Fragment,
      ({
        children: render(slot, rest as Omit<R[K], 'children' | 'as'>),
      } as unknown) as R[K],
    ];
  }

  const shouldOmitAsProp = typeof slot === 'string' && state[slotName]?.as;
  const slotProps = (shouldOmitAsProp ? omit(state[slotName]!, ['as']) : state[slotName]) as R[K];

  return [slot, slotProps];
}
