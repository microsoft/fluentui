import * as React from 'react';
import { useSetInterval, UseSetIntervalReturnType } from './useSetInterval';
import { safeMount } from '@uifabric/test-utilities';

describe('useSetInterval', () => {
  // Initialization
  let timesCalled = 0;

  jest.useFakeTimers();
  const TestComponent = React.forwardRef((props: unknown, ref: React.Ref<{ clearInterval: () => void }>) => {
    const { setInterval, clearInterval } = useSetInterval();
    const { current: state } = React.useRef<{ id: number }>({ id: 0 });

    React.useImperativeHandle(
      ref,
      () => ({
        clearInterval: () => clearInterval(state.id),
      }),
      [clearInterval, state],
    );

    state.id = setInterval(() => {
      timesCalled++;
    }, 0);

    return <div />;
  });

  // Cleanup
  afterEach(() => {
    timesCalled = 0;
  });

  it('updates value when mounted', () => {
    safeMount(<TestComponent />, () => {
      expect(timesCalled).toEqual(0);

      jest.runOnlyPendingTimers();

      expect(timesCalled).toEqual(1);

      jest.runOnlyPendingTimers();

      expect(timesCalled).toEqual(2);
    });
  });

  it('does not regenerate methods on multiple calls', () => {
    let lastResult: UseSetIntervalReturnType | undefined;

    const Test = () => {
      lastResult = useSetInterval();
      return null;
    };

    safeMount(<Test />, wrapper => {
      const result1 = lastResult!;
      lastResult = undefined;

      // Cause a re-render.
      wrapper.setProps({});

      const result2 = lastResult!;

      expect(result1.setInterval).toBeTruthy();
      expect(result1.clearInterval).toBeTruthy();
      expect(result1.setInterval).toBe(result2.setInterval);
      expect(result1.clearInterval).toBe(result2.clearInterval);
    });
  });

  it('does not execute the interval when unmounted', () => {
    safeMount(<TestComponent />, wrapper => {
      expect(timesCalled).toEqual(0);

      wrapper.unmount();

      jest.runOnlyPendingTimers();

      expect(timesCalled).toEqual(0);
    });
  });

  it('can cancel intervals', () => {
    const ref = React.createRef<{ clearInterval: () => void }>();
    safeMount(<TestComponent ref={ref} />, () => {
      jest.runOnlyPendingTimers();

      expect(timesCalled).toEqual(1);

      ref.current!.clearInterval();

      jest.runOnlyPendingTimers();

      expect(timesCalled).toEqual(1);
    });
  });
});
