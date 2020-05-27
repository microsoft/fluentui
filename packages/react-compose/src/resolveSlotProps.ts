import * as React from 'react';
import { OptionsResolverResult, defaultMappedProps, EmptyRender } from './createOptionsResolver';

/**
 * Helper utility which takes in a classes array from compose options, resolves functions,
 * merges them into a final result, and distributes classnames to slotProps within the given
 * resolver result object.
 */
export function resolveSlotProps(result: OptionsResolverResult): OptionsResolverResult {
  const { state, slots, slotProps } = result;

  Object.keys(slots).forEach((slotName: string) => {
    const slot = slots[slotName];
    let slotProp = state[slotName];

    if (slot && slotProp !== undefined) {
      const slotPropType = typeof slotProp;
      const isLiteral = slotPropType === 'string' || slotPropType === 'number' || slotPropType === 'boolean';

      // If the slot prop is a literal or JSX, pass it as a child of the slot.
      if (isLiteral || React.isValidElement(slotProp)) {
        const mappedProp =
          (slot && slot.shorthandConfig && slot.shorthandConfig.mappedProp) || defaultMappedProps[slot] || 'children';
        slotProp = { [mappedProp]: slotProp };
      }

      // If the children is a function, replace the slot.
      if (typeof slotProp.children === 'function') {
        const { children, ...restProps } = slotProp;
        slotProp.children = slotProp.children(slot, restProps);

        // tslint:disable-next-line:no-any
        slots[slotName] = React.Fragment;
      }

      // Assign the resolves props.
      slotProps[slotName] = {
        // ...configSlotProps[slotName],
        ...slotProps[slotName],
        ...slotProp,
      };
    }
    // Ensure no slots are falsey
    if (!slots[slotName]) {
      slots[slotName] = EmptyRender;
    }
  });

  return result;
}
