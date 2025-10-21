import * as React from 'react';

/**
 * Returns a createElement() type based on the props of the Component.
 * Useful for calculating what type a component should render as.
 *
 * @param props - A ReactElement props object
 * @param defaultAs - Default createElement() type
 * @returns A ReactElement type
 */
export function getElementType<P extends Record<string, any>>(
  props: P,
  defaultAs: React.ElementType = 'div',
): React.ElementType {
  // ----------------------------------------
  // use defaultProp or 'div'

  return props.as || defaultAs;
}
