'use client';

import { useIsomorphicLayoutEffect } from '@fluentui/react-utilities';
import * as React from 'react';
import { unstable_NormalPriority as NormalPriority, unstable_runWithPriority as runWithPriority } from 'scheduler';

import type { Context, ContextValue } from './types';

const createProvider = <Value>(Original: React.Provider<ContextValue<Value>>) => {
  const Provider: React.FC<React.ProviderProps<Value>> = props => {
    // Holds an actual "props.value"
    const valueRef = React.useRef(props.value);

    // A stable object, is used to avoid context updates via mutation of its values.
    const contextValue = React.useRef<ContextValue<Value>>(null);

    if (!contextValue.current) {
      contextValue.current = {
        value: valueRef,
        listeners: [],
      };
    }

    useIsomorphicLayoutEffect(() => {
      valueRef.current = props.value;

      runWithPriority(NormalPriority, () => {
        (contextValue.current as ContextValue<Value>).listeners.forEach(listener => {
          listener(props.value);
        });
      });
    }, [props.value]);

    return React.createElement(Original, { value: contextValue.current }, props.children);
  };

  /* istanbul ignore else */
  if (process.env.NODE_ENV !== 'production') {
    Provider.displayName = 'ContextSelector.Provider';
  }

  return Provider as unknown as React.Provider<ContextValue<Value>>;
};

/**
 * @internal
 */
export const createContext = <Value>(defaultValue: Value): Context<Value> => {
  // eslint-disable-next-line @fluentui/no-context-default-value
  const context = React.createContext<ContextValue<Value>>({
    value: { current: defaultValue },
    listeners: [],
    isDefault: true,
  });

  context.Provider = createProvider<Value>(context.Provider);

  // We don't support Consumer API
  delete (context as unknown as Context<Value>).Consumer;

  return context as unknown as Context<Value>;
};
