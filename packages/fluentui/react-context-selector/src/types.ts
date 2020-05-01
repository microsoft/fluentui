import * as React from 'react';

export type Context<Value> = React.Context<Value> & {
  Provider: React.FC<React.ProviderProps<Value>>;
  Consumer: never;
};

export type CreateContextOptions = {
  strict?: boolean;
};

export type ContextListener<Value> = (value: Value) => void;

export type ContextSelector<Value, SelectedValue> = (value: Value) => SelectedValue;

export type ContextValue<Value> = {
  subscribe: (listener: ContextListener<Value>) => any;
  value: Value;
};
