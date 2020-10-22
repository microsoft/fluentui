import * as React from 'react';
import { NullRender } from '../resolveSlotProps';

/**
 * Ensures that the given slots are represented using object syntax. This ensures that
 * the object can be merged along with other objects.
 * @param props - The incoming props
 * @param shorthandPropNames - An array of prop names to apply simplification to
 */
export const resolveShorthandProps = <TProps,>(props: TProps, shorthandPropNames: (keyof TProps)[]): TProps => {
  if (shorthandPropNames.length === 0) {
    return props;
  }

  const newProps: TProps = { ...props };

  for (const propName of shorthandPropNames) {
    const propValue = props[propName];

    if (typeof propValue === 'undefined') {
      continue;
    }

    if (propValue === null) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (newProps as any).components = (newProps as any).components || {};
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (newProps as any).components[propName] = NullRender;
      continue;
    }

    if (typeof propValue !== 'object' || React.isValidElement(propValue)) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (newProps[propName] as any) = newProps[propName] || {};
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (newProps[propName] as any).children = propValue;
    }
  }

  return newProps as TProps;
};
