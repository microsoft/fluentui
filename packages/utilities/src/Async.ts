import { getWindow } from './dom/getWindow';

declare function setTimeout(cb: Function, delay: number): number;
declare function setInterval(cb: Function, delay: number): number;

/**
 * Bugs often appear in async code when stuff gets disposed, but async operations don't get canceled.
 * This Async helper class solves these issues by tying async code to the lifetime of a disposable object.
 *
 * Usage: Anything class extending from BaseModel can access this helper via this.async. Otherwise create a
 * new instance of the class and remember to call dispose() during your code's dispose handler.
 *
 * @public
 */
export class Async {
  private _timeoutIds: { [id: number]: boolean } | null = null;
  private _immediateIds: { [id: number]: boolean } | null = null;
  private _intervalIds: { [id: number]: boolean } | null = null;
  private _animationFrameIds: { [id: number]: boolean } | null = null;
  private _isDisposed: boolean;
  private _parent: object | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _onErrorHandler: ((e: any) => void) | undefined;
  private _noop: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(parent?: object, onError?: (e: any) => void) {
    this._isDisposed = false;
    this._parent = parent || null;
    this._onErrorHandler = onError;
    this._noop = () => {
      /* do nothing */
    };
  }

  /**
   * Dispose function, clears all async operations.
   */
  public dispose(): void {
    let id;

    this._isDisposed = true;
    this._parent = null;

    // Clear timeouts.
    if (this._timeoutIds) {
      for (id in this._timeoutIds) {
        if (this._timeoutIds.hasOwnProperty(id)) {
          this.clearTimeout(parseInt(id, 10));
        }
      }

      this._timeoutIds = null;
    }

    // Clear immediates.
    if (this._immediateIds) {
      for (id in this._immediateIds) {
        if (this._immediateIds.hasOwnProperty(id)) {
          this.clearImmediate(parseInt(id, 10));
        }
      }

      this._immediateIds = null;
    }

    // Clear intervals.
    if (this._intervalIds) {
      for (id in this._intervalIds) {
        if (this._intervalIds.hasOwnProperty(id)) {
          this.clearInterval(parseInt(id, 10));
        }
      }
      this._intervalIds = null;
    }

    // Clear animation frames.
    if (this._animationFrameIds) {
      for (id in this._animationFrameIds) {
        if (this._animationFrameIds.hasOwnProperty(id)) {
          this.cancelAnimationFrame(parseInt(id, 10));
        }
      }

      this._animationFrameIds = null;
    }
  }

  /**
   * SetTimeout override, which will auto cancel the timeout during dispose.
   * @param callback - Callback to execute.
   * @param duration - Duration in milliseconds.
   * @returns The setTimeout id.
   */
  public setTimeout(callback: () => void, duration: number): number {
    let timeoutId = 0;

    if (!this._isDisposed) {
      if (!this._timeoutIds) {
        this._timeoutIds = {};
      }

      timeoutId = setTimeout(() => {
        // Time to execute the timeout, enqueue it as a foreground task to be executed.

        try {
          // Now delete the record and call the callback.
          if (this._timeoutIds) {
            delete this._timeoutIds[timeoutId];
          }
          callback.apply(this._parent);
        } catch (e) {
          this._logError(e);
        }
      }, duration);

      this._timeoutIds[timeoutId] = true;
    }

    return timeoutId;
  }

  /**
   * Clears the timeout.
   * @param id - Id to cancel.
   */
  public clearTimeout(id: number): void {
    if (this._timeoutIds && this._timeoutIds[id]) {
      clearTimeout(id);
      delete this._timeoutIds[id];
    }
  }

  /**
   * SetImmediate override, which will auto cancel the immediate during dispose.
   * @param callback - Callback to execute.
   * @param targetElement - Optional target element to use for identifying the correct window.
   * @returns The setTimeout id.
   */
  public setImmediate(callback: () => void, targetElement?: Element | null): number {
    let immediateId = 0;
    const win = getWindow(targetElement)!;

    if (!this._isDisposed) {
      if (!this._immediateIds) {
        this._immediateIds = {};
      }

      let setImmediateCallback = () => {
        // Time to execute the timeout, enqueue it as a foreground task to be executed.

        try {
          // Now delete the record and call the callback.
          if (this._immediateIds) {
            delete this._immediateIds[immediateId];
          }
          callback.apply(this._parent);
        } catch (e) {
          this._logError(e);
        }
      };

      immediateId = win.setTimeout(setImmediateCallback, 0);

      this._immediateIds[immediateId] = true;
    }

    return immediateId;
  }

  /**
   * Clears the immediate.
   * @param id - Id to cancel.
   * @param targetElement - Optional target element to use for identifying the correct window.
   */
  public clearImmediate(id: number, targetElement?: Element | null): void {
    const win = getWindow(targetElement)!;

    if (this._immediateIds && this._immediateIds[id]) {
      win.clearTimeout(id);
      delete this._immediateIds[id];
    }
  }

  /**
   * SetInterval override, which will auto cancel the timeout during dispose.
   * @param callback - Callback to execute.
   * @param duration - Duration in milliseconds.
   * @returns The setTimeout id.
   */
  public setInterval(callback: () => void, duration: number): number {
    let intervalId = 0;

    if (!this._isDisposed) {
      if (!this._intervalIds) {
        this._intervalIds = {};
      }

      intervalId = setInterval(() => {
        // Time to execute the interval callback, enqueue it as a foreground task to be executed.
        try {
          callback.apply(this._parent);
        } catch (e) {
          this._logError(e);
        }
      }, duration);

      this._intervalIds[intervalId] = true;
    }

    return intervalId;
  }

  /**
   * Clears the interval.
   * @param id - Id to cancel.
   */
  public clearInterval(id: number): void {
    if (this._intervalIds && this._intervalIds[id]) {
      clearInterval(id);
      delete this._intervalIds[id];
    }
  }

  /**
   * Creates a function that, when executed, will only call the func function at most once per
   * every wait milliseconds. Provide an options object to indicate that func should be invoked
   * on the leading and/or trailing edge of the wait timeout. Subsequent calls to the throttled
   * function will return the result of the last func call.
   *
   * Note: If leading and trailing options are true func will be called on the trailing edge of
   * the timeout only if the throttled function is invoked more than once during the wait timeout.
   *
   * @param func - The function to throttle.
   * @param wait - The number of milliseconds to throttle executions to. Defaults to 0.
   * @param options - The options object.
   * @returns The new throttled function.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public throttle<T extends (...args: any[]) => any>(
    func: T,
    wait?: number,
    options?: {
      leading?: boolean;
      trailing?: boolean;
    },
  ): T {
    if (this._isDisposed) {
      return this._noop as T;
    }

    let waitMS = wait || 0;
    let leading = true;
    let trailing = true;
    let lastExecuteTime = 0;
    let lastResult: T;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let lastArgs: any[];
    let timeoutId: number | null = null;

    if (options && typeof options.leading === 'boolean') {
      leading = options.leading;
    }

    if (options && typeof options.trailing === 'boolean') {
      trailing = options.trailing;
    }

    let callback = (userCall?: boolean) => {
      let now = Date.now();
      let delta = now - lastExecuteTime;
      let waitLength = leading ? waitMS - delta : waitMS;
      if (delta >= waitMS && (!userCall || leading)) {
        lastExecuteTime = now;
        if (timeoutId) {
          this.clearTimeout(timeoutId);
          timeoutId = null;
        }
        lastResult = func.apply(this._parent, lastArgs);
      } else if (timeoutId === null && trailing) {
        timeoutId = this.setTimeout(callback, waitLength);
      }

      return lastResult;
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let resultFunction = ((...args: any[]): any => {
      lastArgs = args;
      return callback(true);
    }) as T;

    return resultFunction;
  }

  /**
   * Creates a function that will delay the execution of func until after wait milliseconds have
   * elapsed since the last time it was invoked. Provide an options object to indicate that func
   * should be invoked on the leading and/or trailing edge of the wait timeout. Subsequent calls
   * to the debounced function will return the result of the last func call.
   *
   * Note: If leading and trailing options are true func will be called on the trailing edge of
   * the timeout only if the debounced function is invoked more than once during the wait
   * timeout.
   *
   * @param func - The function to debounce.
   * @param wait - The number of milliseconds to delay.
   * @param options - The options object.
   * @returns The new debounced function.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public debounce<T extends (...args: any[]) => any>(
    func: T,
    wait?: number,
    options?: {
      leading?: boolean;
      maxWait?: number;
      trailing?: boolean;
    },
  ): ICancelable<T> & T {
    if (this._isDisposed) {
      let noOpFunction = (() => {
        /** Do nothing */
      }) as ICancelable<T> & T;

      noOpFunction.cancel = () => {
        return;
      };
      noOpFunction.flush = (() => null) as unknown as () => ReturnType<T>;
      noOpFunction.pending = () => false;

      return noOpFunction;
    }

    let waitMS = wait || 0;
    let leading = false;
    let trailing = true;
    let maxWait: number | null = null;
    let lastCallTime = 0;
    let lastExecuteTime = Date.now();
    let lastResult: ReturnType<T>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let lastArgs: any[];
    let timeoutId: number | null = null;

    if (options && typeof options.leading === 'boolean') {
      leading = options.leading;
    }

    if (options && typeof options.trailing === 'boolean') {
      trailing = options.trailing;
    }

    if (options && typeof options.maxWait === 'number' && !isNaN(options.maxWait)) {
      maxWait = options.maxWait;
    }

    let markExecuted = (time: number) => {
      if (timeoutId) {
        this.clearTimeout(timeoutId);
        timeoutId = null;
      }
      lastExecuteTime = time;
    };

    let invokeFunction = (time: number) => {
      markExecuted(time);
      lastResult = func.apply(this._parent, lastArgs);
    };

    let callback = (userCall?: boolean) => {
      let now = Date.now();
      let executeImmediately = false;
      if (userCall) {
        if (leading && now - lastCallTime >= waitMS) {
          executeImmediately = true;
        }
        lastCallTime = now;
      }
      let delta = now - lastCallTime;
      let waitLength = waitMS - delta;
      let maxWaitDelta = now - lastExecuteTime;
      let maxWaitExpired = false;

      if (maxWait !== null) {
        // maxWait only matters when there is a pending callback
        if (maxWaitDelta >= maxWait && timeoutId) {
          maxWaitExpired = true;
        } else {
          waitLength = Math.min(waitLength, maxWait - maxWaitDelta);
        }
      }

      if (delta >= waitMS || maxWaitExpired || executeImmediately) {
        invokeFunction(now);
      } else if ((timeoutId === null || !userCall) && trailing) {
        timeoutId = this.setTimeout(callback, waitLength);
      }

      return lastResult;
    };

    let pending = (): boolean => {
      return !!timeoutId;
    };

    let cancel = (): void => {
      if (pending()) {
        // Mark the debounced function as having executed
        markExecuted(Date.now());
      }
    };

    let flush = () => {
      if (pending()) {
        invokeFunction(Date.now());
      }

      return lastResult;
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let resultFunction = ((...args: any[]) => {
      lastArgs = args;
      return callback(true);
    }) as ICancelable<T> & T;

    resultFunction.cancel = cancel;
    resultFunction.flush = flush;
    resultFunction.pending = pending;

    return resultFunction;
  }

  public requestAnimationFrame(callback: () => void, targetElement?: Element | null): number {
    let animationFrameId = 0;
    const win = getWindow(targetElement)!;

    if (!this._isDisposed) {
      if (!this._animationFrameIds) {
        this._animationFrameIds = {};
      }

      let animationFrameCallback = () => {
        try {
          // Now delete the record and call the callback.
          if (this._animationFrameIds) {
            delete this._animationFrameIds[animationFrameId];
          }

          callback.apply(this._parent);
        } catch (e) {
          this._logError(e);
        }
      };

      animationFrameId = win.requestAnimationFrame
        ? win.requestAnimationFrame(animationFrameCallback)
        : win.setTimeout(animationFrameCallback, 0);

      this._animationFrameIds[animationFrameId] = true;
    }

    return animationFrameId;
  }

  public cancelAnimationFrame(id: number, targetElement?: Element | null): void {
    const win = getWindow(targetElement)!;

    if (this._animationFrameIds && this._animationFrameIds[id]) {
      win.cancelAnimationFrame ? win.cancelAnimationFrame(id) : win.clearTimeout(id);
      delete this._animationFrameIds[id];
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected _logError(e: any): void {
    if (this._onErrorHandler) {
      this._onErrorHandler(e);
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ICancelable<T extends (...args: any[]) => any> = {
  flush: () => ReturnType<T>;
  cancel: () => void;
  pending: () => boolean;
};
