import { Async } from './Async';
import type { ICancelable } from './Async';

describe('Async', () => {
  describe('debounce', () => {
    // Increase count by a specific number, to test the arguments
    // of the debounced function;
    let callCount = 0;
    const fnMock = (increaseCount: number) => {
      callCount += increaseCount;
      return callCount;
    };
    let fn: jest.Mock<number, [increaseCount: number], unknown>;
    let async: Async;
    let debouncedFn: ICancelable<typeof fn> & typeof fn;

    beforeEach(() => {
      jest.useFakeTimers();
      fn = jest.fn(fnMock);
      async = new Async();
      debouncedFn = async.debounce(fn, 100);
    });

    afterEach(() => {
      callCount = 0;
      fn.mockClear();
    });

    it('should debounce multiple calls', () => {
      // Mock Date.now to return each call
      // First one is the first debouncedFn(1)
      // Second one is debouncedFn(2)
      // A last one will be when the timer fires after we run pending timers in jest.
      const dateMock = jest
        .spyOn(Date, 'now')
        .mockImplementationOnce(() => 10)
        .mockImplementationOnce(() => 11)
        .mockImplementation(() => 2000);

      debouncedFn(1);
      expect(debouncedFn.pending()).toBeTruthy();
      debouncedFn(2);
      expect(debouncedFn.pending()).toBeTruthy();

      jest.runOnlyPendingTimers();

      expect(fn).toHaveBeenCalledTimes(1);
      expect(callCount).toEqual(2);

      dateMock.mockRestore();
    });

    it('should flush the last value', () => {
      debouncedFn(10);
      debouncedFn(20);
      expect(debouncedFn.pending()).toBeTruthy();
      expect(debouncedFn.flush()).toEqual(20);
    });

    it('should be marked pending as expected', () => {
      debouncedFn(100);
      expect(debouncedFn.pending()).toBeTruthy();
      debouncedFn(200);
      expect(debouncedFn.pending()).toBeTruthy();

      debouncedFn.flush();
      expect(debouncedFn.pending()).toBeFalsy();
    });

    it('should be cancellable', () => {
      debouncedFn(1000);
      debouncedFn.cancel();
      expect(debouncedFn.pending()).toBeFalsy();
      expect(debouncedFn.flush()).toBeUndefined();
    });
  });

  describe('throttle', () => {
    it('should throttle multiple calls', () => {
      jest.useFakeTimers();

      // Mock Date.now to return each call
      // First one is the first throttledFn(1)
      // Second one is throttledFn(2)
      // A last one will be when the timer fires after we run pending timers in jest.
      const dateMock = jest
        .spyOn(Date, 'now')
        .mockImplementationOnce(() => 10)
        .mockImplementationOnce(() => 11)
        .mockImplementation(() => 2000);

      const fn = jest.fn((num: number) => num);
      const async = new Async();
      const throttledFn = async.throttle(fn, 1000);

      let result = throttledFn(1);
      expect(result).toBeUndefined();
      result = throttledFn(2);
      expect(result).toBeUndefined();

      jest.runOnlyPendingTimers();

      expect(fn).toHaveBeenCalledTimes(1);

      dateMock.mockRestore();
      jest.useRealTimers();
    });
  });
});
