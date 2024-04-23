import * as React from 'react';

/**
 * @internal
 */
export type Context<Value> = React.Context<Value> & {
  Provider: React.FC<React.ProviderProps<Value>>;
  Consumer: never;
};

export type ContextSelector<Value, SelectedValue> = (value: Value) => SelectedValue;

/**
 * @internal
 */
export type ContextValue<Value> = {
  value: Value;
  subscribe: (listener: () => void) => () => void;
  notify?: () => void;
};
