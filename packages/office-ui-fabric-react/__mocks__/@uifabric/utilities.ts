export * from '@uifabric/utilities';
import { Async } from '@uifabric/utilities';

declare function setTimeout(cb: Function, delay: number): number;

// Known issue with jest's runAllTimers and debounce implementations resulting in
// "Ran 100000 timers, and there are still more! Assuming we've hit an infinite recursion and bailing out..."
// https://github.com/facebook/jest/issues/3465
// Mock impl inspired from issue.
class MockAsync extends Async {
  public debounce(callback: Function, timeout: number) {
    let timeoutId: number | null = null;
    const debounced = (...args: any[]) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
      // Callback functions throughout repo aren't binding properly, so we have to access
      // Async's private _parent member and invoke callbacks the same way Async.debounce does.
      const invokeFunction = () => callback.apply((this as any)._parent, args);
      timeoutId = setTimeout(invokeFunction, timeout);
    };

    const cancel = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
    };

    (debounced as any).cancel = cancel;

    return debounced as any;
  }
}

export { MockAsync as Async };
