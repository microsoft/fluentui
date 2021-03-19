import * as React from 'react';
import { ObjectShorthandProps, ResolvedShorthandProps } from './types';

/**
 * Ensures that the given slots are represented using object syntax. This ensures that
 * the object can be merged along with other objects.
 * @param props - The incoming props
 * @param shorthandPropNames - An array of prop names to apply simplification to
 */
export const resolveShorthandProps = <TProps, TShorthandPropNames extends keyof TProps>(
  props: TProps,
  shorthandPropNames: readonly TShorthandPropNames[],
): ResolvedShorthandProps<TProps, TShorthandPropNames> => {
  let newProps = props;

  if (shorthandPropNames && shorthandPropNames.length) {
    newProps = {
      ...props,
    };
    for (const propName of shorthandPropNames) {
      const propValue = props[propName];

      if (propValue !== undefined && (typeof propValue !== 'object' || React.isValidElement(propValue))) {
        (newProps[propName] as ObjectShorthandProps) = { children: propValue };
      }
    }
  }

  return (newProps as unknown) as ResolvedShorthandProps<TProps, TShorthandPropNames>;
};
