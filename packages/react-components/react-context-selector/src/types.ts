import * as React from 'react';

/**
 * @internal
 */
export type Context<Value> = Omit<React.Context<ContextValue<Value>>, 'Consumer' | 'Provider'> & {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  Provider: (props: React.ProviderProps<Value>) => React.ReactElement;
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
