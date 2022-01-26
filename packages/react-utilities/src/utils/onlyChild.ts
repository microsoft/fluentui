import * as React from 'react';

/**
 * Similar to React.Children.only, but drills into fragments rather than treating them as a single child
 */
export const onlyChild = <P>(
  child: React.ReactElement<P> | React.ReactText | React.ReactFragment | React.ReactPortal | boolean | null | undefined,
): React.ReactElement<P> => {
  if (!React.isValidElement(child)) {
    throw new Error(`Component's child must be a single element`);
  }

  return child.type === React.Fragment ? onlyChild(child.props.children) : child;
};
