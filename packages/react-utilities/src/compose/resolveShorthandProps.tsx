import * as React from 'react';

/**
 * Ensures that the given slots are represented using object syntax. This ensures that
 * the object can be merged along with other objects.
 * @param props - The incoming props
 * @param shorthandPropNames - An array of prop names to apply simplification to
 */
export const resolveShorthandProps = <TProps,>(props: TProps, shorthandPropNames: string[]) => {
  let newProps = props;

  if (shorthandPropNames && shorthandPropNames.length) {
    newProps = {
      ...props,
    };
    for (const propName of shorthandPropNames) {
      // TODO find clean way of guaranteeing only shorthand props are typechecked
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const propValue = props[propName];

      if (propValue !== undefined && (typeof propValue !== 'object' || React.isValidElement(propValue))) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (newProps as any)[propName] = { children: propValue };
      }
    }
  }

  return newProps as TProps;
};
