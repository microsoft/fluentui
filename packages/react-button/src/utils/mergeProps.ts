import * as React from 'react';
import { getNativeProps, imgProperties, buttonProperties, anchorProperties } from '@uifabric/utilities';
import { ComposePreparedOptions } from '@fluentui/react-compose';
import { mergeClassesIntoSlotProps } from './mergeClassesIntoSlotProps';
import { GenericDictionary } from './tempTypes';

/**
 * NOTE! THIS FILE IS TEMPORARY AND SHOULD BE DELETED ONCE IT HAS MOVED TO `@fluentui/react-compose`.
 */

const EmptyRender = () => null;

// Picked up from @fluentui/react-northstar factories
type HTMLTag = 'iframe' | 'img' | 'input';
type ShorthandProp = 'children' | 'src' | 'type';

// It's only necessary to map props that don't use 'children' as value ('children' is the default)
const mappedProps: { [key in HTMLTag]: ShorthandProp } = {
  iframe: 'src',
  img: 'src',
  input: 'type',
};

// tslint:disable-next-line:no-any
const filterProps = (props: any): any => {
  let allowedProps: string[];

  switch (props.as) {
    case 'button':
      allowedProps = buttonProperties;
      break;
    case 'a':
      allowedProps = anchorProperties;
      break;
    case 'img':
      allowedProps = imgProperties;
      break;
    default:
      allowedProps = props;
  }

  return getNativeProps(props, allowedProps);
};

export interface ComponentHookResult<TState, TSlots, TSlotProps> {
  state: TState;
  slots: Required<TSlots> & { root: React.ElementType; __self: React.ElementType };
  slotProps: Required<TSlotProps> & { root: TState };
}

export function mergeProps<TState, TSlots, TSlotProps>(
  state: TState,
  // tslint:disable-next-line:no-any
  options: ComposePreparedOptions,
  defaultSlotProps: Partial<TSlotProps & { root: TState }> = {},
): ComponentHookResult<TState, TSlots, TSlotProps> {
  const slots = {
    ...options.slots,
    // tslint:disable-next-line:no-any
    root: (state as any).as || ((options as any).defaultProps as any)?.as,
  };

  // Grab native props from defaults and state.
  const slotProps: GenericDictionary = {
    ...defaultSlotProps,
    root: {
      ...filterProps({
        ...defaultSlotProps.root,
        // tslint:disable-next-line:no-any
        ...(options as any).defaultProps,
        ...state,
      }),
    },
  };

  // Distribute slot content in state to slotProps.
  Object.keys(slots).forEach(slotName => {
    // tslint:disable-next-line:no-any
    const slot = (slots as any)[slotName];
    // tslint:disable-next-line:no-any
    let slotProp = (state as any)[slotName];

    if (slot && slotProp) {
      const slotPropType = typeof slotProp;
      const isLiteral = slotPropType === 'string' || slotPropType === 'number' || slotPropType === 'boolean';

      if (isLiteral || React.isValidElement(slotProp)) {
        const mappedProp =
          (slot && slot.shorthandConfig && slot.shorthandConfig.mappedProp) ||
          // @ts-ignore
          mappedProps[slot] ||
          'children';

        slotProp = { [mappedProp]: slotProp };
      }

      // If children is a function replace the slot.
      if (typeof slotProp.children === 'function') {
        const { children, ...restProps } = slotProp;
        slotProp.children = slotProp.children(slot, restProps);
        // tslint:disable-next-line:no-any
        (slots as any)[slotName] = React.Fragment;
      }

      slotProps[slotName] = {
        // ...configSlotProps[slotName],
        ...slotProps[slotName],
        ...slotProp,
      };
    }

    // tslint:disable-next-line:no-any
    if (!(slots as any)[slotName]) {
      // tslint:disable-next-line:no-any
      (slots as any)[slotName] = EmptyRender;
    }
  });

  // Mix in classes as needed
  mergeClassesIntoSlotProps(options.classes, state, slots, slotProps);

  return {
    state,
    slots,
    slotProps,
  } as ComponentHookResult<TState, TSlots, TSlotProps>;
}
