import * as React from 'react';

const IS_REACT_19 = React.version.startsWith('19.');

/**
 * Returns a ref for the React element in a backwards-compatible way.
 *
 * @param element - the element to get the ref for
 */
export function getRefFromReactElement<T>(element: React.ReactElement): React.Ref<T> | undefined {
  if (IS_REACT_19) {
    return element.props.ref;
  }

  return (element as React.ReactElement & { ref: React.Ref<T> | undefined }).ref;
}
