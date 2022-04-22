import * as React from 'react';
import { extendComponent } from './extendComponent';

/**
 * Generates a function to be attached to a React component, which can be called
 * as a replacement to setTimeout. In-flight async calls will be auto canceled if the component
 * is unmounting before the async code is executed, preventing bugs where code
 * accesses things within the component after being unmounted.
 */
export const safeSetTimeout = (component: React.Component) => {
  type Timer = ReturnType<typeof window.setTimeout>;
  let activeTimeouts: Set<Timer>;

  return (cb: Function, duration: number) => {
    if (!activeTimeouts) {
      activeTimeouts = new Set<Timer>();

      extendComponent(component, {
        componentWillUnmount: () => {
          activeTimeouts.forEach((id: Timer) => clearTimeout(id));
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
