import * as React from 'react';

import { ComponentState, ShorthandRenderFunction, ObjectShorthandPropsRecord, ObjectShorthandProps } from './types';
import { nullRender } from './nullRender';
import { omit } from '../utils/omit';

export type Slots<S extends ObjectShorthandPropsRecord> = {
  [K in keyof S]-?: S[K] extends ObjectShorthandProps<infer P>
    ? React.ElementType<NonNullable<P>>
    : React.ElementType<NonNullable<S[K]>>;
};

type SlotProps<S extends ObjectShorthandPropsRecord> = {
  [K in keyof S]-?: NonNullable<S[K]> extends ObjectShorthandProps<infer P> ? P : never;
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
 * primitives, the props will be filtered according the the slot type. For example, if the
 * slot is rendered `as: 'a'`, the props will be filtered for acceptable anchor props.
 *
 * @param state - State including slot definitions
 * @param slotNames - Name of which props are slots
 * @returns An object containing the `slots` map and `slotProps` map.
 */
export function getSlots<R extends ObjectShorthandPropsRecord>(
  state: ComponentState<R>,
  slotNames: (keyof R)[] = ['root'],
): {
  slots: Slots<R>;
  slotProps: SlotProps<R>;
} {
  const slots = {} as Slots<R>;
  const slotProps = {} as R;

  for (const slotName of slotNames) {
    const [slot, props] = getSlot(state, slotName);
    slots[slotName] = slot as R[typeof slotName] extends ObjectShorthandProps<infer P>
      ? React.ElementType<NonNullable<P>>
      : never;
    slotProps[slotName] = props;
  }
  return { slots, slotProps: (slotProps as unknown) as SlotProps<R> };
}

function getSlot<R extends ObjectShorthandPropsRecord, K extends keyof R>(
  state: ComponentState<R>,
  slotName: K,
): readonly [React.ElementType<R[K]>, R[K]] {
  if (state[slotName] === undefined) {
    return [nullRender, undefined!];
  }
  const { children, as: asProp, ...rest } = state[slotName]!;

  const slot = (state.components?.[slotName] === undefined || typeof state.components[slotName] === 'string'
    ? asProp || state.components?.[slotName] || 'div'
    : state.components[slotName]) as React.ElementType<R[K]>;

  if (typeof children === 'function') {
    const render = children as ShorthandRenderFunction<R[K]>;
    return [
      React.Fragment,
      ({
        children: render(slot, rest),
      } as unknown) as R[K],
    ];
  }

  const shouldOmitAsProp = typeof slot === 'string' && state[slotName]?.as;
  const slotProps = (shouldOmitAsProp ? omit(state[slotName]!, ['as']) : state[slotName]) as R[K];

  return [slot, slotProps];
}
