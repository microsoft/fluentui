import type * as React from 'react';

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
  /** Holds a set of subscribers from components. */
  listeners: ((payload: Value) => void)[];

  /** Holds an actual value of React's context that will be propagated down for computations. */
  value: { current: Value };

  /** Indicates if a context holds default value. */
  isDefault?: boolean;
};
