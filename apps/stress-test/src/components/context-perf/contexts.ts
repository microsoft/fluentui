import * as React from 'react';
import { getTestParams } from '../../shared/testParams';

interface ContextValue {
  value: number;
}

export const contexts = new Array(getTestParams().numStartNodes)
  .fill(0)
  .map(() => React.createContext<ContextValue>({ value: -1 }));
