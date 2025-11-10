import * as React from 'react';

export type StaggerChildMapping = Record<string, { element: React.ReactElement; index: number }>;

/**
 * Given `children`, return an object mapping key to child element and its index.
 * This allows tracking individual items by identity (via React keys) rather than by position.
 *
 * Uses React.Children.toArray() which:
 * - Automatically provides stable indices (0, 1, 2, ...)
 * - Handles key normalization (e.g., 'a' → '.$a') consistently
 * - Flattens fragments automatically
 * - Generates keys for elements without explicit keys (e.g., '.0', '.1', '.2')
 *
 * @param children - React children to map
 * @returns Object mapping child keys to { element, index }
 */
// TODO: consider unifying with getChildMapping from react-motion package by making it generic
export function getStaggerChildMapping(children: React.ReactNode | undefined): StaggerChildMapping {
  const childMapping: StaggerChildMapping = {};

  if (children) {
    React.Children.toArray(children).forEach((child, index) => {
      if (React.isValidElement(child)) {
        childMapping[child.key ?? ''] = {
          element: child,
          index,
        };
      }
    });
  }

  return childMapping;
}
