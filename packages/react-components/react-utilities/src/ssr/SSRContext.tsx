import * as React from 'react';
import { canUseDOM } from './canUseDOM';

/**
 * To support SSR, the auto incrementing id counter is stored in a context. This allows it to be reset on every request
 * to ensure the client and server are consistent.
 *
 * @internal
 */
export type SSRContextValue = {
  current: number;
};

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
  const [value] = React.useState<SSRContextValue>(() => ({ current: 0 }));

  return <SSRContext.Provider value={value}>{props.children}</SSRContext.Provider>;
};

/**
 * Returns whether the component is currently being server side rendered or hydrated on the client. Can be used to delay
 * browser-specific rendering until after hydration. May cause re-renders on a client when is used within SSRProvider.
 */
export function useIsSSR(): boolean {
  const isInSSRContext = useSSRContext() !== defaultSSRContextValue;
  const [isSSR, setIsSSR] = React.useState(isInSSRContext);

  // If we are rendering in a non-DOM environment, and there's no SSRProvider, provide a warning to hint to the
  // developer to add one.
  if (process.env.NODE_ENV !== 'production') {
    if (!isInSSRContext && !canUseDOM()) {
      // eslint-disable-next-line no-console
      console.error(
        'When server rendering, you must wrap your application in an <SSRProvider> to ensure consistent ids are ' +
          'generated between the client and server.',
      );
    }
  }

  // If on the client, and the component was initially server rendered, then schedule a layout effect to update the
  // component after hydration.
  if (canUseDOM() && isInSSRContext) {
    // This if statement technically breaks the rules of hooks, but is safe because the condition never changes after
    // mounting.
    // eslint-disable-next-line
    React.useLayoutEffect(() => {
      setIsSSR(false);
    }, []);
  }

  return isSSR;
}
