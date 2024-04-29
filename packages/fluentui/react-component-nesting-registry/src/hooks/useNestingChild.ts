import * as React from 'react';

import { NestingContext } from '../NestingContext';
import { NestingContextValue } from '../types';
import { UseNestingHookResult } from './types';

// These hooks are not used currently
/* eslint-disable */

export const useNestingChild = <T extends Node>(): UseNestingHookResult<T> => {
  const nestingContext = React.useContext(NestingContext) as NestingContextValue;
  const childRef = React.useRef(null);

  const getRefs = React.useCallback(() => {
    return nestingContext.getContextRefs(childRef as any);
  }, []);

  React.useEffect(() => {
    nestingContext.register(childRef as any);
    return () => nestingContext.unregister(childRef as any);
  }, []);

  return {
    NestedComponent: React.Fragment,
    nestedProps: null,

    getRefs,
    isRoot: false,
    ref: childRef,
  };
};
