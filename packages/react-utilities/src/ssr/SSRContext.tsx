import * as React from 'react';
import { canUseDOM } from './canUseDOM';

/**
 * To support SSR, the auto incrementing id counter is stored in a context. This allows it to be reset on every request
 * to ensure the client and server are consistent.
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

  return <SSRContext.Provider value={value}>{props.children}</SSRContext.Provider>;
};

/**
 * Returns whether the component is currently being server side rendered or hydrated on the client. Can be used to delay
 * browser-specific rendering until after hydration.
 */
export function useIsSSR(): boolean {
  const isWrappedBySSRProvider = useSSRContext() !== defaultSSRContextValue;

  // If we are rendering in a non-DOM environment, and there's no SSRProvider, provide a warning to hint to the
  // developer to add one.
  if (process.env.NODE_ENV !== 'production') {
    if (!isWrappedBySSRProvider && !canUseDOM()) {
      // eslint-disable-next-line no-console
      console.error(
        'When server rendering, you must wrap your application in an <SSRProvider> to ensure consistent ids are ' +
          'generated between the client and server.',
      );
    }
  }

  return (
    typeof window === 'undefined' ||
    /ServerSideRendering/.test(window.navigator && window.navigator.userAgent) ||
    isWrappedBySSRProvider
  );
}
