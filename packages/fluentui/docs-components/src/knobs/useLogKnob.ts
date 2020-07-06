import * as React from 'react';

import { LogContextFunctions } from './KnobContexts';
import { LogFormatter } from './types';

const defaultFormatter: LogFormatter = (name: string) => `${new Date().toLocaleTimeString()}: ${name}`;

export const useLogKnob = <T = (...args: any[]) => any>(
  name: string,
  callback?: T,
  formatter: LogFormatter = defaultFormatter,
): T => {
  const { appendLog } = React.useContext(LogContextFunctions);

  const proxy = React.useCallback<any>(
    (...a) => {
      appendLog(formatter(name, ...a));

      if (typeof callback === 'function') {
        return (callback as any)(...a);
      }

      return null;
    },
    [appendLog, callback, name, formatter],
  );

  return proxy as T;
};
