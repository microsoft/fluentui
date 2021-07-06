import * as React from 'react';
import { ObjectShorthandPropsCompat, ResolvedShorthandPropsCompat } from './types';

/**
 * Ensures that the given slots are represented using object syntax. This ensures that
 * the object can be merged along with other objects.
 * @param props - The incoming props
 * @param shorthandPropNames - An array of prop names to apply simplification to
 */
export const resolveShorthandProps = <TProps, TShorthandPropNames extends keyof TProps>(
  props: TProps,
  shorthandPropNames: readonly TShorthandPropNames[],
): ResolvedShorthandPropsCompat<TProps, TShorthandPropNames> => {
  let newProps = props;

  for (const propName of shorthandPropNames) {
    const propValue = props[propName];
    if (propValue !== undefined && (typeof propValue !== 'object' || React.isValidElement(propValue))) {
      if (newProps === props) {
        newProps = { ...props }; // Copy props before modifying
      }

      (newProps[propName] as ObjectShorthandPropsCompat) = { children: propValue };
    }
  }

  return (newProps as unknown) as ResolvedShorthandPropsCompat<TProps, TShorthandPropNames>;
};
