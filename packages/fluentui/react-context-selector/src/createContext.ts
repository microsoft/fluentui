import * as React from 'react';

import { Context, ContextValue } from './types';
import { runWithNormalPriority, useIsomorphicLayoutEffect } from './utils';

const createProvider = <Value>(Original: React.Provider<ContextValue<Value>>) => {
  const Provider: React.FC<React.ProviderProps<Value>> = props => {
    // TODO: write better descriptions
    const valueRef = React.useRef(props.value); // value from props.value
    const versionRef = React.useRef(0); // render/effect counter
    const contextValue = React.useRef<ContextValue<Value>>(); // stable object to avoid context updates

    if (!contextValue.current) {
      contextValue.current = {
        value: valueRef,
        version: versionRef,
        listeners: [],
      };
    }

    useIsomorphicLayoutEffect(() => {
      valueRef.current = props.value;
      versionRef.current += 1;

      runWithNormalPriority(() => {
        (contextValue.current as ContextValue<Value>).listeners.forEach(listener => {
          listener([versionRef.current, props.value]);
        });
      });
    }, [props.value]);

    return React.createElement(Original, { value: contextValue.current }, props.children);
  };

  /* istanbul ignore else */
  if (process.env.NODE_ENV !== 'production') {
    Provider.displayName = 'ContextSelector.Provider';
  }

  return Provider;
};

export const createContext = <Value>(defaultValue: Value): Context<Value> => {
  const context = React.createContext<ContextValue<Value>>({
    value: { current: defaultValue },
    version: { current: -1 },
    listeners: [],
  });

  context.Provider = createProvider<Value>(context.Provider) as any;

  // We don't support Consumer API
  delete ((context as unknown) as Context<Value>).Consumer;

  return (context as unknown) as Context<Value>;
};
