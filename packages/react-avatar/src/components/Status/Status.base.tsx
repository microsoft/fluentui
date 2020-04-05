import * as React from 'react';
import { getNativeProps, divProperties, merge } from '@uifabric/utilities';
import { IStatusProps } from './Status.types';
import { compose } from '../temp/compose';
import cx from 'classnames';

const getSlotPropsFromClasses = (
  // tslint:disable-next-line:no-any
  slots: { [key: string]: any },
  classes: { [key: string]: string },
  props: { [key: string]: any },
) => {
  // First break up the class names based on prefixes:
  //
  // "_value" = flag, where "Value" is the flag
  // "_size_large" = enum where "size" is the enum prop and "large" is the value
  // default: slot class
  const slotProps = {};

  Object.keys(classes).forEach(key => {
    // If the classname starts with "_", break it up.
    const parts = key.split('_');

    if (parts.length === 2) {
      // flag
      const slotProp = (slotProps.root = slotProps.root || {});
      slotProp.className = cx(slotProp.className, props[parts[1]] && classes[key]);
    } else if (parts.length === 3) {
      const slotProp = (slotProps.root = slotProps.root || {});
      const enumName = parts[1];
      const enumValue = parts[2];
      // enum
      slotProp.className = cx(slotProp.className, props[enumName] === enumValue && classes[key]);
    } else {
      const slotProp = (slotProps[key] = slotProps[key] || {});
      slotProp.className = cx(slotProp.className, classes[key]);
    }
  });

  return slotProps;
};

const resolveSlots = () => {};

const useStatus = (props: IStatusProps) => {
  const { classes = {} } = props;

  const state = props;
  const slots = {
    ...props.slots,
    root: props.as || 'span',
    icon: () => null,
  };
  const classProps = getSlotPropsFromClasses(slots, classes, props);
  const nativeProps = {
    root: getNativeProps(props, divProperties) as any,
  };

  const slotProps = merge(nativeProps, classProps);

  return {
    state,
    slots,
    slotProps,
  };
};

// BASE (unstyled, no styled dependencies)
export const StatusBase = compose<IStatusProps>(
  // render function
  (props: IStatusProps) => {
    // A base component refers to a state hook to derive slots and slot props. This keeps the
    // function component focused on the DOM shape.
    const { slots, slotProps } = useStatus(props);

    // The slot props are used to define the final DOM structure. User input and
    // state can be used to conditionally render parts of the markup.
    return <slots.root {...slotProps.root}>{props.icon && <slots.icon {...slotProps.icon} />}</slots.root>;
  },

  // default props
  {
    slots: {
      root: 'span',
      icon: undefined,
    },

    slotProps: {
      // root: {},
      // icon: {},
    },
  },

  // statics
  {
    displayName: 'Status',
    // className: 'ui-Status',
  },
);
