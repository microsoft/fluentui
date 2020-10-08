import * as React from 'react';
import { getNativeElementProps, omit } from '@uifabric/utilities';
import { GenericDictionary } from './types';
// import { NullRender } from '../resolveSlotProps';

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
    // TODO: It is strange that there is no props.components.root, but there is a slots.root generated.
    root: state.as || 'div',
  };

  const slotProps: GenericDictionary = {
    root: typeof slots.root === 'string' ? getNativeElementProps(slots.root, state) : omit(state, ['as', 'components']),
  };

  if (slotNames) {
    for (const name of slotNames) {
      const slotDefinition = state[name];
      const Component = state?.components?.[name];

      // TODO: Handle slots that are "empty" or not defined by the user
      //        was handled with nullRenderer (prob right)

      // slot has been opted-out
      if (Component === null || slotDefinition === null) {
        continue;
      }

      slots[name] = Component;

      // children render function
      if (typeof slotDefinition?.children === 'function') {
        slotProps[name] = {
          children: slotDefinition.children(Component, omit(slotDefinition, ['children'])),
        };
        slots[name] = React.Fragment;
        continue;
      }

      slotProps[name] =
        typeof Component === 'string' ? getNativeElementProps(Component, slotDefinition) : slotDefinition;
    }
  }

  return { slots, slotProps };
};
