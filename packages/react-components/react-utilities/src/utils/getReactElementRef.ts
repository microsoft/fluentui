import * as React from 'react';

const IS_REACT_19 = React.version.startsWith('19.');

/**
 * Returns a ref for the React element in a backwards-compatible way.
 *
 * @param element - The element to get the ref for.
 * @returns The ref for the element.
 */
export function getReactElementRef<T>(element: React.ReactElement | null | undefined): React.Ref<T> | undefined {
  if (!element) {
    return undefined;
  }

  if (IS_REACT_19) {
    return element.props.ref;
  }

  return (element as React.ReactElement & { ref: React.Ref<T> | undefined }).ref;
}
