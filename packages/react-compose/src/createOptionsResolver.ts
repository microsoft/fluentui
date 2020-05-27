import { ComposePreparedOptions, GenericDictionary } from './types';
import * as React from 'react';
import { getNativeElementProps } from '@uifabric/utilities';
import { resolveClasses } from './resolveClasses';

export type OptionsResolverResult = {
  state: GenericDictionary;
  slots: GenericDictionary;
  slotProps: GenericDictionary;
};

/**
 * A set of mapped props for intrinsic element types.
 */
const defaultMappedProps: Record<string, string> = {
  iframe: 'src',
  img: 'src',
  input: 'type',
};

const EmptyRender = () => null;

/**
 * Creates an options resolve function which should attach to an options object
 * for a composed component.
 */
export const createOptionsResolver = <TState>(options: ComposePreparedOptions) => {
  // Returning a function so that "resolve" function shows up in profiling.
  // tslint:disable-next-line:no-function-expression
  return function resolve(stateOrProps: TState): OptionsResolverResult {
    const slotProps: OptionsResolverResult['slotProps'] = {};
    const state = stateOrProps as OptionsResolverResult['state'];
    const slots: OptionsResolverResult['slots'] = { ...options.slots };
    const result: OptionsResolverResult = {
      state,
      slotProps,
      slots,
    };

    // Always ensure a root slot exists.
    slots.root = state.as || slots.root || 'div';

    // Mix unrecognized props onto root, excluding the handled props.
    assignToMapObject(
      slotProps,
      'root',
      getNativeElementProps(state.as, state, [...options.handledProps, 'className']),
    );

    // Resolve slotProps/slots from state.
    resolveSlotProps(result);

    // Resolve classes.
    resolveClasses(options.classes, result);

    return result;
  };
};

function assignToMapObject(map: Record<string, {}>, key: string, value: {}) {
  if (value) {
    if (!map[key]) {
      map[key] = {};
    }
    Object.assign(map[key], value);
  }
}

export function resolveSlotProps({ state, slots, slotProps }: OptionsResolverResult) {
  Object.keys(slots).forEach((slotName: string) => {
    const slot = slots[slotName];
    let slotProp = state[slotName];

    if (slot && slotProp) {
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
}
