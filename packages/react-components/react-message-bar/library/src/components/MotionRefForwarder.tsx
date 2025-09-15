import * as React from 'react';

const MotionRefForwarderContext = React.createContext<React.Ref<HTMLElement> | undefined>(undefined);

/**
 * @internal
 */
export function useMotionForwardedRef(): React.Ref<HTMLElement> | undefined {
  return React.useContext(MotionRefForwarderContext);
}

/**
 * A component that forwards a ref to its children via a React context.
 *
 * @internal
 */
export const MotionRefForwarder = React.forwardRef<HTMLElement, { children: React.ReactElement }>((props, ref) => {
  return <MotionRefForwarderContext.Provider value={ref}>{props.children}</MotionRefForwarderContext.Provider>;
});
