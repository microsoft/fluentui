import * as React from 'react';
import { useSetInterval } from './useSetInterval';
import { safeMount } from '@uifabric/test-utilities';
import { validateHookValueNotChanged } from './testUtilities';

describe('useSetInterval', () => {
  // Initialization
  let timesCalled = 0;

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  afterEach(() => {
    timesCalled = 0;
  });

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

  it('updates value when mounted', () => {
    safeMount(<TestComponent />, () => {
      expect(timesCalled).toEqual(0);

      jest.runOnlyPendingTimers();

      expect(timesCalled).toEqual(1);

      jest.runOnlyPendingTimers();

      expect(timesCalled).toEqual(2);
    });
  });

  validateHookValueNotChanged('returns the same callbacks each time', () => {
    const { setInterval, clearInterval } = useSetInterval();
    return [setInterval, clearInterval];
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
