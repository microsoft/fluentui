import * as React from 'react';
import { isSSR } from './isSSR';

/**
 * To support SSR, the auto incrementing id counter is stored in a context. This allows it to be reset on every request
 * to ensure the client and server are consistent. There is also a prefix counter that is used to support async loading
 * components.
 *
 * Each async boundary must be wrapped in an SSR provider, which increments the prefix and resets the current id
 * counter. This ensures that async loaded components have consistent ids regardless of the loading order.
 *
 * @internal
 */
export interface SSRContextValue {
  current: number;
}

/**
 * Default context value to use in case there is no SSRProvider. This is fine for client-only apps.
 *
 * @internal
 */
export const defaultSSRContextValue: SSRContextValue = {
  current: 0,
};

export const SSRContext = React.createContext<SSRContextValue>(defaultSSRContextValue);

/**
 * @internal
 */
export function useSSRContext(): SSRContextValue {
  return React.useContext(SSRContext);
}

/**
 * When using SSR with Fluent UI, applications must be wrapped in an SSRProvider. This ensures that auto generated ids
 * are consistent between the client and server.
 *
 * @public
 */
export const SSRProvider: React.FC = props => {
  const value: SSRContextValue = React.useMemo(() => ({ current: 0 }), []);

  // If we are rendering in a non-DOM environment, and there's no SSRProvider, provide a warning to hint to the
  // developer to add one.
  if (process.env.NODE_ENV !== 'production') {
    if (defaultSSRContextValue === value && isSSR()) {
      // eslint-disable-next-line no-console
      console.error(
        'When server rendering, you must wrap your application in an <SSRProvider> to ensure consistent ids are ' +
          'generated between the client and server.',
      );
    }
  }

  return <SSRContext.Provider value={value}>{props.children}</SSRContext.Provider>;
};
