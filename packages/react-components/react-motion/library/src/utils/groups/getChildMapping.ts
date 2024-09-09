import * as React from 'react';
import type { PresenceGroupChildMapping } from './types';

/**
 * Given `children`, return an object mapping key to child.
 */
export function getChildMapping(children: React.ReactNode | undefined) {
  const childMapping: PresenceGroupChildMapping = {};

  if (children) {
    React.Children.toArray(children).forEach(child => {
      if (React.isValidElement(child)) {
        childMapping[child.key ?? ''] = {
          appear: false,
          element: child,
          visible: true,
          unmountOnExit: true,
        };
      }
    });
  }

  return childMapping;
}
