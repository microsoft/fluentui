import * as React from 'react';

export type Context<Value> = React.Context<Value> & {
  Provider: React.FC<React.ProviderProps<Value>>;
  Consumer: never;
};

export type ContextSelector<Value, SelectedValue> = (value: Value) => SelectedValue;

export type ContextVersion = number;

export type ContextValue<Value> = {
  STRUCT: {
    /** TODO */
    listeners: ((payload: readonly [ContextVersion, Value]) => void)[];

    /** TODO */
    value: React.MutableRefObject<Value>;

    /** TODO */
    version: React.MutableRefObject<ContextVersion>;
  };
};
