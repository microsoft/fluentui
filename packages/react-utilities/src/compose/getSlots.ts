import * as React from 'react';
import { nullRender } from './nullRender';
import { getNativeElementProps } from '../utils/getNativeElementProps';
import { omit } from '../utils/omit';
import type { ComponentState, ShorthandRenderFunction, SlotPropsRecord } from './types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getRootSlot<SlotProps extends SlotPropsRecord = {}>(state: ComponentState<any>) {
  const slot =
    state.components?.root === undefined || typeof state.components.root === 'string'
      ? state.as || state.components?.root || 'div'
      : state.components.root;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const props: any = typeof slot === 'string' ? getNativeElementProps(slot, state) : omit(state, ['components']);
  return [slot, props] as const;
}

/**
 * Hack that converts an Union to an Intersection
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : U;

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
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getSlots<SlotProps extends SlotPropsRecord = {}>(state: ComponentState<any>, slotNames?: string[]) {
  /**
   * force typings on state, this should not be added directly in parameters to avoid type inference
   */
  const typedState = state as ComponentState<SlotProps>;
  /**
   * force typings on slotNames, this should not be added directly in parameters to avoid type inference
   */
  const typedSlotNames = slotNames as Array<keyof SlotProps> | undefined;

  type Slots = { [K in keyof SlotProps]-?: React.ElementType<SlotProps[K]> };

  const slots = {} as Slots;

  const slotProps = {} as SlotProps;

  if (typedSlotNames) {
    for (const name of typedSlotNames) {
      if (typedState[name] === undefined) {
        slots[name] = nullRender;
        continue;
      }
      const { children, ...rest } = typedState[name];

      slots[name] = (typedState.components?.[name] || 'div') as Slots[typeof name];

      if (typeof children === 'function') {
        const render = children as ShorthandRenderFunction<SlotProps[keyof SlotProps]>;
        // TODO: converting to unknown might be harmful
        slotProps[name] = ({
          children: render(slots[name], rest as ComponentState<SlotProps>[keyof SlotProps]),
        } as unknown) as SlotProps[keyof SlotProps];
        slots[name] = React.Fragment;
      } else {
        slotProps[name] = typedState[name];
      }
    }
  }

  const [root, rootProps] = getRootSlot(state);

  const typedSlotProps = slotProps as {
    [Key in keyof SlotProps]-?: UnionToIntersection<NonNullable<SlotProps[Key]>>;
  };

  return {
    slots: { ...slots, root },
    slotProps: { ...typedSlotProps, root: rootProps },
  } as const;
}
