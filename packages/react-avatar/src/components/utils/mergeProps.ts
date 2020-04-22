import * as React from 'react';
import { getNativeProps, htmlElementProperties, imgProperties } from '@uifabric/utilities';
import cx from 'classnames';
import { ComposeOptions } from './compose';
import { resolveClasses } from './resolveClasses';

// tslint:disable-next-line:no-any
type GenericDictionary = { [key: string]: any };

const EmptyRender = () => null;

// tslint:disable-next-line:no-any
const filterProps = (props: any): any => {
  let allowedProps: string[];

  switch (props.as) {
    case 'img':
      allowedProps = imgProperties;
      break;
    default:
      allowedProps = htmlElementProperties;
  }

  return getNativeProps(props, allowedProps);
};

const mergeClassesIntoSlotProps = (
  // tslint:disable-next-line:no-any
  classes: GenericDictionary,
  props: GenericDictionary,
  slots: GenericDictionary,
  slotProps: GenericDictionary,
) => {
  // First break up the class names based on prefixes:
  //
  // "_value" = flag, where "Value" is the flag
  // "_size_large" = enum where "size" is the enum prop and "large" is the value
  // default: slot class
  if (classes) {
    // classes = resolveClasses(props, classes);

    Object.keys(classes).forEach(key => {
      if (slots[key]) {
        slotProps[key] = slotProps[key] || {};
        slotProps[key].className = cx(key === 'root' && props.className, slotProps.className, classes[key]);
      } else {
        const slotProp = (slotProps.root = slotProps.root || {});

        // If the classname has "_", it's an enum, otherwise it's a modifier.
        if (key.indexOf('_') >= 0) {
          const parts = key.split('_');
          const enumName = parts[0];
          const enumValue = parts[1];

          slotProp.className = cx(slotProp.className, props[enumName] === enumValue && classes[key]);
        } else {
          slotProp.className = cx(slotProp.className, props[key] && classes[key]);
        }
      }
    });
  }

  return slotProps;
};

export interface ComponentHookResult<TState, TSlots, TSlotProps> {
  state: TState;
  slots: Required<TSlots> & { root: React.ElementType };
  slotProps: Required<TSlotProps> & { root: TState };
}

export function mergeProps<TState, TSlots, TSlotProps>(
  state: TState,
  // tslint:disable-next-line:no-any
  options: ComposeOptions<any, any, any, any>,
  defaultSlotProps: Partial<TSlotProps & { root: TState }> = {},
): ComponentHookResult<TState, TSlots, TSlotProps> {
  const slots = {
    ...options.slots,
    // tslint:disable-next-line:no-any
    root: (state as any).as || (options.defaultProps as any)?.as,
  };

  // Grab native props from defaults and state.
  const slotProps: GenericDictionary = {
    ...defaultSlotProps,
    root: {
      ...filterProps({
        ...defaultSlotProps.root,
        ...options.defaultProps,
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
        const mappedProp = slot.mappedProp || 'children';

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
