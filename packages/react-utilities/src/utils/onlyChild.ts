import * as React from 'react';

/**
 * Similar to React.Children.only, but drills into fragments rather than treating them as a single child
 */
export const onlyChild = (child: React.ReactNode): React.ReactElement => {
  if (!React.isValidElement(child)) {
    throw new Error(`Component's child must be a single element`);
  }

  return child.type === React.Fragment ? onlyChild(child.props.children) : child;
};
