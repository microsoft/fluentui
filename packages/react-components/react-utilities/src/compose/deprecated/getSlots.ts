import * as React from 'react';
import { omit } from '../../utils/omit';
import type {
  AsIntrinsicElement,
  ComponentState,
  ExtractSlotProps,
  SlotPropsRecord,
  SlotRenderFunction,
  UnknownSlotProps,
} from '../types';
import { isSlot } from '../isSlot';
import { SLOT_RENDER_FUNCTION_SYMBOL } from '../constants';
import { UnionToIntersection } from '../../utils/types';

/**
 * @deprecated - use slot.always or slot.optional combined with assertSlots instead
 */
export type Slots<S extends SlotPropsRecord> = {
  [K in keyof S]: ExtractSlotProps<S[K]> extends AsIntrinsicElement<infer As>
    ? // for slots with an `as` prop, the slot will be any one of the possible values of `as`
      As
    : ExtractSlotProps<S[K]> extends React.ComponentType<infer P>
    ? React.ElementType<NonNullable<P>>
    : React.ElementType<ExtractSlotProps<S[K]>>;
};

/**
 * @deprecated - use slot.always or slot.optional combined with assertSlots instead
 */
export type ObjectSlotProps<S extends SlotPropsRecord> = {
  [K in keyof S]-?: ExtractSlotProps<S[K]> extends AsIntrinsicElement<infer As>
    ? // For intrinsic element types, return the intersection of all possible
      // element's props, to be compatible with the As type returned by Slots<>
      UnionToIntersection<JSX.IntrinsicElements[As]> // Slot<'div', 'span'>
    : ExtractSlotProps<S[K]> extends React.ComponentType<infer P>
    ? P // Slot<typeof Button>
    : ExtractSlotProps<S[K]>; // Slot<ButtonProps>
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
  state: ComponentState<R>,
): {
  // eslint-disable-next-line deprecation/deprecation
  slots: Slots<R>;
  // eslint-disable-next-line deprecation/deprecation
  slotProps: ObjectSlotProps<R>;
} {
  // eslint-disable-next-line deprecation/deprecation
  const slots = {} as Slots<R>;
  const slotProps = {} as R;

  const slotNames: (keyof R)[] = Object.keys(state.components);
  for (const slotName of slotNames) {
    const [slot, props] = getSlot(state, slotName);
    // eslint-disable-next-line deprecation/deprecation
    slots[slotName] = slot as Slots<R>[typeof slotName];
    slotProps[slotName] = props;
  }
  // eslint-disable-next-line deprecation/deprecation
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
    state.components?.[slotName] === undefined || typeof state.components[slotName] === 'string'
      ? asProp || state.components?.[slotName] || 'div'
      : state.components[slotName]
  ) as React.ElementType<R[K]>;

  if (renderFunction || typeof children === 'function') {
    const render = (renderFunction || children) as SlotRenderFunction<R[K]>;
    return [
      React.Fragment,
      {
        children: render(slot, rest as Omit<R[K], 'as'>),
      } as unknown as R[K],
    ];
  }

  const shouldOmitAsProp = typeof slot === 'string' && asProp;
  const slotProps = (shouldOmitAsProp ? omit(props, ['as']) : (props as UnknownSlotProps)) as R[K];
  return [slot, slotProps];
}
