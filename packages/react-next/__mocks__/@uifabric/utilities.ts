export * from '@uifabric/utilities';
import { Async } from '@uifabric/utilities';

declare function setTimeout(cb: Function, delay: number): number;

// Known issue with jest's runAllTimers and debounce implementations resulting in
// "Ran 100000 timers, and there are still more! Assuming we've hit an infinite recursion and bailing out..."
// https://github.com/facebook/jest/issues/3465
// Mock impl inspired from issue.
class MockAsync extends Async {
  private _timeoutId: number | null;

  public debounce(callback: Function, timeout: number) {
    this._timeoutId = null;
    const debounced = (...args: any[]) => {
      if (this._timeoutId) {
        clearTimeout(this._timeoutId);
        this._timeoutId = null;
      }
      // Callback functions throughout repo aren't binding properly, so we have to access
      // Async's private _parent member and invoke callbacks the same way Async.debounce does.
      const invokeFunction = () => callback.apply((this as any)._parent, args);
      this._timeoutId = setTimeout(invokeFunction, timeout);
    };

    const cancel = () => {
      if (this._timeoutId) {
        clearTimeout(this._timeoutId);
        this._timeoutId = null;
      }
    };

    (debounced as any).cancel = cancel;

    return debounced as any;
  }

  public dispose() {
    clearTimeout(this._timeoutId);
    this._timeoutId = null;

    super.dispose();
  }
}

export { MockAsync as Async };
