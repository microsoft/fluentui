import * as React from 'react';
import { getNativeElementProps, omit } from '@uifabric/utilities';
import { GenericDictionary } from './types';

/**
 * Given the state and an array of slot names, will break out `slots` and `slotProps`
 * collections.
 *
 * The root is always derived from the `as` prop.
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
export const getSlots = (state: GenericDictionary, slotNames?: string[] | undefined) => {
  const slots: GenericDictionary = {
    root: state.as || 'div',
  };

  const slotProps: GenericDictionary = {
    root: typeof state.as === 'string' ? getNativeElementProps(state.as, state) : state,
  };

  if (slotNames) {
    for (const name of slotNames) {
      const Component = state?.components[name];
      const userProps = state[name];
      const hasComponent = typeof Component === null;
      const isPrimitive = typeof Component === 'string';

      // slot has been opted-out
      if (hasComponent === null || userProps === null) {
        continue;
      }

      slots[name] = Component;

      if (typeof userProps.children === 'function') {
        slotProps[name] = {
          children: userProps.children(slots[name], omit(userProps, ['children'])),
        };
        slots[name] = React.Fragment;
      } /* is a valid react component (div | MyThing) */ else {
        slotProps[name] = isPrimitive ? getNativeElementProps(Component, userProps) : userProps;
      }
    }
  }

  return { slots, slotProps };
};
