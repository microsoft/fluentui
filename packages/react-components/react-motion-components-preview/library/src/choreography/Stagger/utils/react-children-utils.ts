import * as React from 'react';

/**
 * Flattens ReactNode (including Fragments) to an array of valid ReactElements,
 * filtering out strings, numbers, null, etc.
 */
export const toElementArray = (children: React.ReactNode): React.ReactElement[] =>
  React.Children.toArray(children).filter(React.isValidElement) as React.ReactElement[];

/**
 * Returns true if the given child is a React Fragment.
 */
export const isFragment = (child: React.ReactNode): child is React.ReactElement =>
  React.isValidElement(child) && child.type === React.Fragment;

/**
 * Convert React children that might be a Fragment or other JSX into a clean array of React elements.
 */
export const childrenOrFragmentToArray = (children: React.ReactNode): React.ReactElement[] => {
  // If this is a Fragment, grab its children (may be undefined for an empty Fragment)
  if (isFragment(children)) {
    const fragmentChildren = (children.props as { children?: React.ReactNode }).children;
    return toElementArray(fragmentChildren);
  }

  return toElementArray(children);
};
