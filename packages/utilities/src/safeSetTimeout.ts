import * as React from 'react';
import { extendComponent } from './extendComponent';

/**
 * Generates a function to be attached to a React component, which can be called
 * as a replacement to setTimeout. In-flight async calls will be auto canceled if the component
 * is unmounting before the async code is executed, preventing bugs where code
 * accesses things within the component after being unmounted.
 */
export const safeSetTimeout = (component: React.Component) => {
  let activeTimeouts: Set<ReturnType<typeof setTimeout>>;

  return (cb: Function, duration: number) => {
    if (!activeTimeouts) {
      activeTimeouts = new Set();

      extendComponent(component, {
        componentWillUnmount: () => {
          activeTimeouts.forEach(id => clearTimeout(id));
        },
      });
    }

    const timeoutId = setTimeout(() => {
      activeTimeouts.delete(timeoutId);
      cb();
    }, duration);
    activeTimeouts.add(timeoutId);
  };
};
