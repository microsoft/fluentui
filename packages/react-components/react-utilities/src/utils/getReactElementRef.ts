import * as React from 'react';

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

  // React 19+
  if (typeof element.props.ref !== 'undefined') {
    return element.props.ref;
  }

  type ReactElementLegacy = React.ReactElement & { ref?: React.Ref<any> };
  // React < 19
  if (typeof (element as ReactElementLegacy).ref !== 'undefined') {
    return (element as ReactElementLegacy).ref;
  }
}
