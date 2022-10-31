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
export type ContextVersion = number;

/**
 * @internal
 */
export type ContextValue<Value> = {
  /** Holds a set of subscribers from components. */
  listeners: ((payload: readonly [ContextVersion, Value]) => void)[];

  /** Holds an actual value of React's context that will be propagated down for computations. */
  value: React.MutableRefObject<Value>;

  /** A version field is used to sync a context value and consumers. */
  version: React.MutableRefObject<ContextVersion>;
};

/**
 * @internal
 */
export type ContextValues<Value> = ContextValue<Value> & {
  /** List of listners to publish changes */
  listeners: ((payload: readonly [ContextVersion, Record<string, Value>]) => void)[];
};
