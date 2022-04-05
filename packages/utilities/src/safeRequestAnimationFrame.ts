import * as React from 'react';
import { extendComponent } from './extendComponent';

/**
 * Generates a function to be attached to a React component, which can be called
 * as a replacement to RAF. In-flight async calls will be auto canceled if the component
 * is unmounting before the async code is executed, preventing bugs where code
 * accesses things within the component after being unmounted.
 */
export const safeRequestAnimationFrame = (component: React.Component): ((cb: Function) => void) => {
  let activeTimeouts: Set<number>;

  return (cb: Function) => {
    if (!activeTimeouts) {
      activeTimeouts = new Set<number>();

      extendComponent(component, {
        componentWillUnmount: () => {
          activeTimeouts.forEach((id: number) => cancelAnimationFrame(id));
        },
      });
    }

    const timeoutId = requestAnimationFrame(() => {
      activeTimeouts.delete(timeoutId);
      cb();
    });

    activeTimeouts.add(timeoutId);
  };
};
