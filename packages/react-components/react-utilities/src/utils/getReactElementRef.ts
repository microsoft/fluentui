import * as React from 'react';

const IS_REACT_19_OR_HIGHER = parseInt(React.version, 10) >= 19;

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

  if (IS_REACT_19_OR_HIGHER) {
    return element.props.ref;
  }

  return (element as React.ReactElement & { ref: React.Ref<T> | undefined }).ref;
}
