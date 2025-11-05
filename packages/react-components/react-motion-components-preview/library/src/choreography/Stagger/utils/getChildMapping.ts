import * as React from 'react';

export type StaggerChildMapping = Record<string, { element: React.ReactElement; index: number }>;

/**
 * Given `children`, return an object mapping key to child element and its index.
 * This allows tracking individual items by identity (via React keys) rather than by position.
 *
 * @param children - React children to map
 * @returns Object mapping child keys to { element, index }
 */
export function getChildMapping(children: React.ReactNode | undefined): StaggerChildMapping {
  const childMapping: StaggerChildMapping = {};

  if (children) {
    let index = 0;
    React.Children.forEach(children, child => {
      if (React.isValidElement(child)) {
        const key = child.key ?? `.${index}`;
        childMapping[key] = {
          element: child,
          index,
        };
        index++;
      }
    });
  }

  return childMapping;
}
