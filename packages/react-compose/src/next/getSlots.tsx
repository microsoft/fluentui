import * as React from 'react';
import { getNativeElementProps } from '@uifabric/utilities';
import { GenericDictionary } from './types';
import { nullRender } from './nullRender';

/**
 * Given the state and an array of slot names, will break out `slots` and `slotProps`
 * collections. Ensures that each slot is a renderable component, and each slotProp is
 * a list of acceptable native properties for the given slot. Native properties are only
 * filtered if the slot is rendered "as" a string type, and will use `getNativeElementProps`
 * to pass along only valid props. If the slot is a non-string value, no filtering is done.
 *
 * @param state - State including slot definitions
 * @param slotNames - Name of which props are slots
 * @returns An object containing the `slots` map and `slotProps` map.
 */
export const getSlots = (state: GenericDictionary, slotNames?: string[] | undefined) => {
  const slots: GenericDictionary = {
    root: state.as || nullRender,
  };
  const slotProps: GenericDictionary = {
    root: getNativeElementProps(state.as, state),
  };

  if (slotNames) {
    for (const name of slotNames!) {
      const slotDefinition = state[name];
      const { as: slotAs, children } = slotDefinition;

      const slot = (slots[name] = slotDefinition.children || typeof slotAs !== 'string' ? slotAs : nullRender);

      if (slots[name] !== nullRender) {
        slotProps[name] =
          typeof slot === 'string'
            ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
              getNativeElementProps(slot as any, slotDefinition)
            : slotDefinition;

        if (children === 'function') {
          slotProps[name].children = children(slots[name], slotDefinition);
          slots[name] = React.Fragment;
        }
      }
    }
  }

  return { slots, slotProps };
};
