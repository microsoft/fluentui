import * as React from 'react';

import { NestingContext } from '../NestingContext';
import { NestedContextProps } from '../types';
import { RefStack } from '../utils/RefStack';
import { UseNestingHookResult } from './types';

const registrySet = new RefStack();

// These hooks are not used currently
/* eslint-disable */

export const useNestingRoot = <T extends Node>(): UseNestingHookResult<T> => {
  const [registry] = React.useState(registrySet);
  const parentRef = React.useRef<T>(null);

  const nestedProps: NestedContextProps = React.useMemo(
    () => ({
      value: {
        getContextRefs: registry.getContextRefs,
        register: registry.register,
        unregister: registry.unregister,
      },
    }),
    [],
  );
  const getRefs = React.useCallback(() => {
    return registry.getContextRefs(parentRef as any);
  }, []);

  React.useEffect(() => {
    registry.register(parentRef as any);

    return () => registry.unregister(parentRef as any);
  }, []);

  return {
    NestedComponent: NestingContext.Provider,
    nestedProps,

    getRefs,
    isRoot: true,
    ref: parentRef,
  };
};
