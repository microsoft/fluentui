import * as React from 'react';

/**
 * Flattens ReactNode (including Fragments) to an array of valid ReactElements,
 * filtering out strings, numbers, null, etc.
 */
export const toElementArray = (children: React.ReactNode): React.ReactElement[] =>
  React.Children.toArray(children).filter(React.isValidElement) as React.ReactElement[];
