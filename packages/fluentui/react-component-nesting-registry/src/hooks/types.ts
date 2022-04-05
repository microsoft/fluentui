import * as React from 'react';
import { GetRefs, NestedContextProps, NestingContextValue } from '../types';

export type UseNestingHookResult<T> = {
  NestedComponent: React.Provider<NestingContextValue> | React.ReactFragment;
  nestedProps: NestedContextProps | null;

  getRefs: GetRefs;
  isRoot: boolean;
  ref: React.RefObject<T>;
};
