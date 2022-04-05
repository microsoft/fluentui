export * from '@fluentui/utilities';
import { Async } from '@fluentui/utilities';

declare function setTimeout(cb: Function, delay: number): number;

// Known issue with jest's runAllTimers and debounce implementations resulting in
// "Ran 100000 timers, and there are still more! Assuming we've hit an infinite recursion and bailing out..."
// https://github.com/facebook/jest/issues/3465
// Mock impl inspired from issue.
class MockAsync extends Async {
  private _timeoutId: number | undefined;

  public debounce(callback: Function, timeout: number) {
    this._timeoutId = undefined;
    const debounced = (...args: any[]) => {
      if (this._timeoutId) {
        clearTimeout(this._timeoutId);
        this._timeoutId = undefined;
      }
      // Callback functions throughout repo aren't binding properly, so we have to access
      // Async's private _parent member and invoke callbacks the same way Async.debounce does.
      const invokeFunction = () => callback.apply((this as any)._parent, args);
      this._timeoutId = setTimeout(invokeFunction, timeout);
    };

    const cancel = () => {
      if (this._timeoutId) {
        clearTimeout(this._timeoutId);
        this._timeoutId = undefined;
      }
    };

    (debounced as any).cancel = cancel;

    return debounced as any;
  }

  public dispose() {
    if (this._timeoutId) {
      clearTimeout(this._timeoutId);
    }
    this._timeoutId = undefined;

    super.dispose();
  }

  protected _logError(e: any) {
    super._logError(e);
    // Don't eat errors thrown from async callbacks
    throw e;
  }
}

export { MockAsync as Async };
