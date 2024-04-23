import * as React from 'react';
import type { Context, ContextValue } from './types';

const createProvider = <Value>(Original: React.Provider<ContextValue<Value>>) => {
  const Provider: React.FC<React.ProviderProps<Value>> = props => {
    const [store] = React.useState(() => {
      const listeners = new Set<Function>();

      return {
        value: props.value,

        subscribe: (listener: Function) => {
          listeners.add(listener);

          return () => {
            listeners.delete(listener);
          };
        },

        notify: () => {
          for (const listener of listeners) {
            listener();
          }
        },
      };
    });

    React.useEffect(
      () => {
        if (!Object.is(store.value, props.value)) {
          store.value = props.value;
          store.notify();
        }
      },
      // "store" is a constant object, so it's safe to omit it from the dependencies
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [props.value],
    );

    return React.createElement(Original, { value: store }, props.children);
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
    value: defaultValue,
    subscribe: () => () => {
      /* noop */
    },
  });

  context.Provider = createProvider<Value>(context.Provider);

  // We don't support Consumer API
  delete (context as unknown as Context<Value>).Consumer;

  return context as unknown as Context<Value>;
};
