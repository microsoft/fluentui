import { beep } from './beep';

// tslint:disable-next-line:no-any
export function instrumentMethod(target: any, methodName: string): void {
  const originalMethod = target[methodName];

  // tslint:disable-next-line:no-any
  target[methodName] = function(): any {
    beep();

    const startTime = performance.now();
    const retVal = originalMethod.apply(this, arguments);
    const duration = performance.now() - startTime;

    if (duration <= 1) {
      console.log(`${methodName} called`, getStackTrace());
    } else if (duration <= 10) {
      console.warn(`${methodName} called, took ${Math.round(duration * 1000) / 1000}ms`, getStackTrace());
    } else {
      console.error(`${methodName} called, took ${Math.round(duration * 1000) / 1000}ms`, getStackTrace());
    }

    return retVal;
  };
}

export function getStackTrace(): string {
  const obj = {
    stack: ''
  };

  const captureStackTrace = (Error as {
    captureStackTrace?: (obj: { stack: string }, getStackTrace: () => {}) => void;
  }).captureStackTrace;

  if (captureStackTrace) {
    captureStackTrace(obj, getStackTrace);
    const stackEntries = obj.stack.split('at ');

    obj.stack = stackEntries[2];
  }

  return obj.stack;
}
