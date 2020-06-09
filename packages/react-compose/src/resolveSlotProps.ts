import * as React from 'react';
import { MergePropsResult } from './mergeProps';
import { defaultMappedProps } from './defaultMappedProps';
import { ComposePreparedOptions, GenericDictionary } from './types';

export const NullRender = () => null;

/**
 * Helper utility which resolves the slots and slot props derived from user input.
 */
export function resolveSlotProps<TProps, TState>(
  result: MergePropsResult<TState>,
  options: ComposePreparedOptions<TProps, TState>,
): MergePropsResult<TState> {
  const { state, slots, slotProps } = result;

  // Derive the default slot props from the config, if provided.
  options.slotProps.forEach(definition => {
    // tslint:disable-next-line:no-any
    const nextSlotProps = definition(state as any);

    Object.keys(nextSlotProps).forEach(key => {
      slotProps[key] = { ...slotProps[key], ...nextSlotProps[key] };
    });
  });

  //  Mix unrecognized props onto root, appropriate, excluding the handled props.
  assignToMapObject(slotProps, 'root', getUnhandledProps(state, options));

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

function assignToMapObject(map: Record<string, {}>, key: string, value: {}) {
  if (value) {
    if (!map[key]) {
      map[key] = {};
    }
    map[key] = { ...map[key], ...value };
  }
}

function getUnhandledProps<TProps, TState>(
  props: GenericDictionary,
  options: ComposePreparedOptions<TProps, TState>,
): GenericDictionary {
  const unhandledProps: GenericDictionary = {};
  const slots = Object.keys(options.slots);

  for (const key of Object.keys(props)) {
    if (
      key !== 'className' &&
      key !== 'as' &&
      options.handledProps.indexOf(key as keyof TProps) === -1 &&
      slots.indexOf(key) === -1
    ) {
      unhandledProps[key] = props[key];
    }
  }

  return unhandledProps;
}
