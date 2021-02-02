import * as React from 'react';

export type Context<Value> = React.Context<Value> & {
  Provider: React.FC<React.ProviderProps<Value>>;
  Consumer: never;
};

export type ContextSelector<Value, SelectedValue> = (value: Value) => SelectedValue;

export type ContextVersion = number;

export type ContextValue<Value> = {
  /** List of listners to publish changes */
  listeners: ((payload: readonly [ContextVersion, Value]) => void)[];

  /** Current state value */
  value: React.MutableRefObject<Value>;

  /** Version to compare if it should run dispatch ( publish ) */
  version: React.MutableRefObject<ContextVersion>;
};

export type ContextValues<Value> = ContextValue<Value> & {
  /** List of listners to publish changes */
  listeners: ((payload: readonly [ContextVersion, Record<string, Value>]) => void)[];
};
