import * as React from 'react';

/**
 * Flattens ReactNode (including Fragments) to an array of valid ReactElements,
 * filtering out strings, numbers, null, etc.
 */
// export const toElementArray = (children: React.ReactNode): React.ReactElement[] =>
// React.Children.toArray(children).filter(React.isValidElement) as React.ReactElement[];

export const toElementArray = (children: React.ReactNode): React.ReactElement[] => {
  const result: React.ReactElement[] = [];

  React.Children.forEach(children, child => {
    if (React.isValidElement(child)) {
      result.push(child);
    } else if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.warn('Stagger toElementArray: Ignoring non-ReactElement child:', child);
    }
  });

  return result;
};
