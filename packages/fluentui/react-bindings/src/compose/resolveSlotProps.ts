import * as React from 'react';
import { defaultMappedProps, ComposePreparedOptions, GenericDictionary, MergePropsResult } from './consts';
import { mergeSlotProp } from './mergeSlotProp';

export const NullRender = () => null;

/**
 * Helper utility which resolves the slots and slot props derived from user input.
 */
export function resolveSlotProps<TProps extends {}, TState extends {} = TProps>(
  result: MergePropsResult<TState>,
  options: ComposePreparedOptions<TProps, TState>,
): MergePropsResult<TState> {
  const { state, slots, slotProps } = result;

  // Derive the default slot props from the config, if provided.
  options.slotProps.forEach(definition => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const slotProp = (state as any)[slotName];

    if (slot && slotProp !== undefined && slotProp !== null) {
      const mergedSlotProp = mergeSlotProp(
        slotProp,
        slotProps[slotName],
        (slot && slot.shorthandConfig && slot.shorthandConfig.mappedProp) || defaultMappedProps[slot],
      );

      if (typeof mergedSlotProp.children === 'function') {
        const { children, ...restProps } = slotProp;
        // If the children is a function, replace the slot.
        slots[slotName] = React.Fragment;
        slotProps[slotName] = {
          children: slotProp.children(slot, { ...slotProps[slotName], ...restProps }),
        };
      } else {
        slotProps[slotName] = mergedSlotProp;
      }
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
