'use client';

import * as React from 'react';

const MotionRefForwarderContext = React.createContext<React.Ref<HTMLElement> | undefined>(undefined);

/**
 * A hook that reads the ref forwarded by `MotionRefForwarder` from context.
 * Used in child components to merge the motion ref into the root slot ref.
 *
 * @internal
 */
export function useMotionForwardedRef(): React.Ref<HTMLElement> | undefined {
  return React.useContext(MotionRefForwarderContext);
}

/**
 * A component that forwards a ref to its children via a React context.
 * This is used to pass a motion component's ref through to the actual surface element,
 * since motion components wrap their children and the ref needs to reach the inner element.
 *
 * @internal
 */
export const MotionRefForwarder = React.forwardRef<HTMLElement, { children: React.ReactElement }>((props, ref) => {
  return <MotionRefForwarderContext.Provider value={ref}>{props.children}</MotionRefForwarderContext.Provider>;
});

MotionRefForwarder.displayName = 'MotionRefForwarder';
