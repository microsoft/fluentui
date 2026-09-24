import * as React from 'react';

export type SequenceChildMapping = Record<string, { element: React.ReactElement; index: number }>;

/**
 * Given `children`, return an object mapping key to child element and its index.
 * Handles fragments by flattening them into the child array.
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
export function getSequenceChildMapping(children: React.ReactNode | undefined): SequenceChildMapping {
  const childMapping: SequenceChildMapping = {};

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

/**
 * Convert Sequence children to an ordered array of elements.
 * This is a convenience function that extracts just the elements in order.
 *
 * @param children - React children to convert
 * @returns Array of React elements in their original order
 */
export function getSequenceChildArray(children: React.ReactNode | undefined): React.ReactElement[] {
  const mapping = getSequenceChildMapping(children);
  return Object.values(mapping)
    .sort((a, b) => a.index - b.index)
    .map(item => item.element);
}
