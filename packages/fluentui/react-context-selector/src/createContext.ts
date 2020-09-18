import * as React from 'react';
import { Context, ContextListener, ContextValue, CreateContextOptions } from './types';

// Stops React Context propagation
// https://github.com/facebook/react/blob/95bd7aad7daa80c381faa3215c80b0906ab5ead5/packages/react-reconciler/src/ReactFiberBeginWork.js#L2656
const calculateChangedBits = () => 0;

const createProvider = <Value>(Original: React.Provider<ContextValue<Value>>) => {
  const Provider: React.FC<React.ProviderProps<Value>> = props => {
    const listeners = React.useRef<ContextListener<Value>[]>([]);

    // We call listeners in render intentionally. Listeners are not technically pure, but
    // otherwise we can't get benefits from concurrent mode.
    //
    // We make sure to work with double or more invocation of listeners.
    listeners.current.forEach(listener => listener(props.value));

    // Disables updates propogation for React Context as `value` is always shallow equal
    const subscribe = React.useCallback((listener: ContextListener<Value>) => {
      listeners.current.push(listener);

      const unsubscribe = () => {
        const index = listeners.current.indexOf(listener);
        listeners.current.splice(index, 1);
      };

      return unsubscribe;
    }, []);

    return React.createElement(Original, { value: { subscribe, value: props.value } }, props.children);
  };

  /* istanbul ignore else */
  if (process.env.NODE_ENV !== 'production') {
    Provider.displayName = 'ContextSelector.Provider';
  }

  return Provider;
};

export const createContext = <Value>(defaultValue: Value, options: CreateContextOptions = {}): Context<Value> => {
  const { strict = true } = options;

  const context = React.createContext<ContextValue<Value>>(
    {
      get subscribe() {
        if (strict) {
          /* istanbul ignore next */
          throw new Error(
            process.env.NODE_ENV === 'production'
              ? ''
              : `Please use <Provider /> component from "@fluentui/react-context-selector"`,
          );
        }

        /* istanbul ignore next */
        return () => () => {};
      },
      value: defaultValue,
    },
    calculateChangedBits,
  );
  context.Provider = createProvider<Value>(context.Provider) as any;

  // We don't support Consumer API
  delete context.Consumer;

  return (context as unknown) as Context<Value>;
};
