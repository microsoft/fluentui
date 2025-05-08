import * as React from 'react';

/** Convert ReactNode to an array of ReactElements, filtering out nulls, strings, numbers, etc. */

const toElementArray = (children: React.ReactNode): React.ReactElement[] => {
  return React.Children.toArray(children).filter(React.isValidElement) as React.ReactElement[];
};

const isFragment = (child: React.ReactNode): child is React.ReactElement => {
  return React.isValidElement(child) && child.type === React.Fragment;
};
/** Convert React children that might be a Fragment or other JSX into a clean array of React elements. */

export const childrenOrFragmentToArray = (children: React.ReactNode): React.ReactElement[] => {
  if (isFragment(children)) {
    return toElementArray(children.props.children);
  }
  return toElementArray(children);
};
