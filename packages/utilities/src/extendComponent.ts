import * as React from 'react';
import { appendFunction } from './appendFunction';

/**
 * Extends a component's lifetime methods by appending new functions to the existing lifetime functions.
 */
export function extendComponent<T extends React.Component>(parent: T, methods: { [key in keyof T]?: T[key] }): void {
  for (let name in methods) {
    if (methods.hasOwnProperty(name)) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      parent[name] = appendFunction(parent, parent[name], methods[name]) as any;
    }
  }
}
