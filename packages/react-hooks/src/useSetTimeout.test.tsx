import * as React from 'react';
import { useSetTimeout } from './useSetTimeout';
import { safeMount } from '@fluentui/test-utilities';
import { validateHookValueNotChanged } from './testUtilities';

describe('useSetTimeout', () => {
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

  const TestComponent = React.forwardRef((props: unknown, ref: React.Ref<{ clearTimeout: () => void }>) => {
    const { setTimeout, clearTimeout } = useSetTimeout();
    const { current: state } = React.useRef<{ id: number }>({ id: 0 });

    React.useImperativeHandle(
      ref,
      () => ({
        clearTimeout: () => clearTimeout(state.id),
      }),
      [clearTimeout, state],
    );

    state.id = setTimeout(() => {
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

      expect(timesCalled).toEqual(1);
    });
  });

  validateHookValueNotChanged('returns the same callbacks each time', () => {
    const { setTimeout, clearTimeout } = useSetTimeout();
    return [setTimeout, clearTimeout];
  });

  it('does not execute the timeout when unmounted', () => {
    safeMount(<TestComponent />, wrapper => {
      expect(timesCalled).toEqual(0);

      wrapper.unmount();

      jest.runOnlyPendingTimers();

      expect(timesCalled).toEqual(0);
    });
  });

  it('can cancel timeout', () => {
    const ref = React.createRef<{ clearTimeout: () => void }>();
    safeMount(<TestComponent ref={ref} />, () => {
      jest.runOnlyPendingTimers();

      expect(timesCalled).toEqual(1);

      ref.current!.clearTimeout();

      jest.runOnlyPendingTimers();

      expect(timesCalled).toEqual(1);
    });
  });
});
