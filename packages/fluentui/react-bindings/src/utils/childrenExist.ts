import * as React from 'react';

/**
 * Tests if children are nil in React and Preact.
 *
 * @param children - The children prop of a component.
 */
export const childrenExist = (children: React.ReactNode): boolean => {
  if (children === null || children === undefined) return false;

  if (typeof children === 'number') return !isNaN(children);

  if (Array.isArray(children)) return children.length > 0;

  return !!children;
};
