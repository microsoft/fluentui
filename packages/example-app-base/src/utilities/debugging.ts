import { beep } from './beep';

// tslint:disable-next-line:no-any
export function instrumentMethod(target: any, methodName: string): void {
  const originalMethod = target[methodName];

  // tslint:disable-next-line:no-any
  target[methodName] = function (): any {
    beep();

    let startTime = performance.now();
    let retVal = originalMethod.apply(this, arguments);
    let duration = performance.now() - startTime;

    /* tslint:disable:no-console */
    if (duration <= 1) {
      console.log(`${methodName} called`, getStackTrace());
    } else if (duration <= 10) {
      console.warn(`${methodName} called, took ${Math.round(duration * 1000) / 1000}ms`, getStackTrace());
    } else {
      console.error(`${methodName} called, took ${Math.round(duration * 1000) / 1000}ms`, getStackTrace());
    }
    /* tslint:enable:no-console */

    return retVal;
  };
}

export function getStackTrace(): string {
  let obj = {
    stack: ''
  };

  // tslint:disable-next-line:no-string-literal no-any
  const captureStackTrace = (Error as any)['captureStackTrace'];

  if (captureStackTrace) {
    captureStackTrace(obj, getStackTrace);
    let stackEntries = obj.stack.split('at ');

    obj.stack = stackEntries[2];
  }

  return obj.stack;
}
