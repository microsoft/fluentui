import * as React from 'react';
import { useSetTimeout } from './useSetTimeout';
import { safeMount } from '@uifabric/test-utilities';

describe('useSetTimeout', () => {
  // Initialization
  let timesCalled = 0;

  jest.useFakeTimers();
  const TestComponent: React.FunctionComponent = () => {
    const safeSetTimeout = useSetTimeout();

    safeSetTimeout(() => {
      timesCalled++;
    }, 10);

    return <div />;
  };

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

      expect(timesCalled).toEqual(1);
    });
  });

  it('does not execute the timeout when unmounted', () => {
    safeMount(<TestComponent />, wrapper => {
      expect(timesCalled).toEqual(0);

      wrapper.unmount();

      jest.runAllTimers();

      expect(timesCalled).toEqual(0);
    });
  });
});
