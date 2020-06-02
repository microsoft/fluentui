import * as React from 'react';
import { MergePropsResult } from './mergeProps';
import { defaultMappedProps } from './defaultMappedProps';
import { ComposePreparedOptions } from './types';

export const NullRender = () => null;

export const defaultHandledProps = new Set(['className', 'as']);

/**
 * Helper utility which resolves the slots and slot props derived from user input.
 */
export function resolveSlotProps<TProps, TState>(
  result: MergePropsResult<TState>,
  options: ComposePreparedOptions<TProps, TState>,
): MergePropsResult<TState> {
  const { state, slots, slotProps } = result;

  // Ensure a root prop exists.
  slotProps.root = slotProps.root || {};

  // Derive the default slot props from the config, if provided.
  options.slotProps.forEach(definition => {
    // tslint:disable-next-line:no-any
    const nextSlotProps = definition(state as any);

    Object.keys(nextSlotProps).forEach(key => {
      slotProps[key] = { ...slotProps[key], ...nextSlotProps[key] };
    });
  });

  //  Mix unrecognized state onto root, excluding the handled props.
  Object.keys(state).reduce<Partial<TState>>((acc, propName: string) => {
    if (
      !defaultHandledProps.has(propName) &&
      !options.slots.hasOwnProperty(propName) &&
      propName !== 'as' &&
      propName !== 'children' &&
      (options.handledProps as string[]).indexOf(propName) === -1
    ) {
      // tslint:disable-next-line:no-any
      (acc as any)[propName] = (state as any)[propName];
    }
    return acc;
  }, slotProps.root);

  // Iterate through slots and resolve shorthand values.
  Object.keys(slots).forEach((slotName: string) => {
    const slot = slots[slotName];
    // tslint:disable-next-line:no-any
    let slotProp = (state as any)[slotName];

    if (slot && slotProp !== undefined && slotProp !== null) {
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

        slots[slotName] = React.Fragment;
      }

      // Assign the slot's props.
      slotProps[slotName] = {
        ...slotProps[slotName],
        ...slotProp,
      };
    }

    // Ensure no slots are falsey
    if (!slots[slotName] || slotProp === null) {
      slots[slotName] = NullRender;
    }
  });

  return result;
}
