import * as React from 'react';

import { ComponentState, ShorthandRenderFunction, SlotPropsRecord } from './types';
import { nullRender } from './nullRender';
import { getNativeElementProps, omit } from '../utils/index';

function getSlot(
  defaultComponent: React.ElementType | undefined,
  userComponent: keyof JSX.IntrinsicElements | undefined,
) {
  if (defaultComponent === undefined || typeof defaultComponent === 'string') {
    return userComponent || defaultComponent || 'div';
  }
  return defaultComponent;
}

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
  const typedSlotNames = slotNames as Array<keyof SlotProps>;

  type Slots = { [K in keyof SlotProps]: React.ElementType<SlotProps[K]> };

  const slots = ({
    root: getSlot(typedState.components ? typedState.components.root : undefined, typedState.as),
  } as Slots & { root: React.ElementType }) as Slots;

  const slotProps = ({
    root: typeof slots.root === 'string' ? getNativeElementProps(slots.root, typedState) : typedState,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as SlotProps & { root: any }) as SlotProps;

  if (typedSlotNames) {
    for (const name of typedSlotNames) {
      const { as, children } = typedState[name];

      const slot = getSlot(typedState.components ? typedState.components[name] : undefined, as) as Slots[typeof name];

      // TODO: rethink null rendering scenario. This fails in some cases, e.g: CompoundButton, AccordionHeader
      if (typeof slot === 'string' && children === undefined) {
        slots[name] = nullRender;
        continue;
      } else {
        slots[name] = slot;
      }

      if (typeof children === 'function') {
        const render = children as ShorthandRenderFunction<SlotProps[keyof SlotProps]>;
        // TODO: converting to unknown might be harmful
        slotProps[name] = ({
          children: render(
            slots[name],
            omit(typedState[name], ['children']) as ComponentState<SlotProps>[keyof SlotProps],
          ),
        } as unknown) as SlotProps[keyof SlotProps];
        slots[name] = React.Fragment;
      } else {
        slotProps[name] =
          typeof slots[name] === 'string'
            ? (omit(typedState[name], ['as']) as ComponentState<SlotProps>[keyof SlotProps])
            : typedState[name];
      }
    }
  }

  return {
    slots: slots as Slots & { root: React.ElementType },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    slotProps: slotProps as SlotProps & { root: any },
  } as const;
}
