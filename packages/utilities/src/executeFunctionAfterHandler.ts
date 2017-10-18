// tslint:disable:no-any
import { memoizeFunction } from './memoize';

/**
 * Given a function that is used as an event handler, execute the given function after the handler has been executed.
 * An example would be to execute a function that logs that an event happened after handling the event.
 */
export const executeFunctionAfterHandler = memoizeFunction(<T extends (...args: any[]) => void>(
  handler: T | undefined,
  functionToExecute: () => void
): T => {
  // tslint:disable-next-line:no-function-expression
  return function wrappedFunction(...args: any[]): void {
    if (handler) {
      handler(...args);
    }
    functionToExecute();
  } as T;
});