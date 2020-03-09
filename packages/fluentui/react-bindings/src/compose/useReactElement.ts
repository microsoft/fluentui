import * as React from 'react';

// https://github.com/facebook/react/blob/bdc5cc4635f13e5ca43883a9f9587fc9a868c528/packages/react-reconciler/src/ReactFiber.js#L129
type ReactFiber<T extends React.ElementType, P extends Record<string, any>> = {
  // The resolved function/class/ associated with this fiber.
  type: T;

  pendingProps: P;
};

// https://github.com/facebook/react/blob/master/packages/react/src/ReactCurrentOwner.js
type ReactCurrentOwner<T extends React.ElementType, P extends Record<string, any>> = {
  current: null | ReactFiber<T, P>;
};

const useReactElement = <T extends React.ElementType, P extends Record<string, any>>(): [
  ReactFiber<T, P>['type'] | undefined,
  P | undefined
] => {
  const currentOwner: ReactCurrentOwner<T, P> = (React as any).__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner;

  return [currentOwner.current?.type, currentOwner.current?.pendingProps];
};

export default useReactElement;
