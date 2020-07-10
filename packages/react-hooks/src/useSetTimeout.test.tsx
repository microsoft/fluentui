import * as React from 'react';
import { useSetTimeout, UseSetTimeoutReturnType } from './useSetTimeout';
import { safeMount } from '@uifabric/test-utilities';

describe('useSetTimeout', () => {
  // Initialization
  let timesCalled = 0;

  jest.useFakeTimers();
  const TestComponent = React.forwardRef((props: unknown, ref: React.Ref<{ clearTimeout: () => void }>) => {
    const { setTimeout, clearTimeout } = useSetTimeout();
    const { current: state } = React.useRef<{ id: number }>({ id: 0 });

    React.useImperativeHandle(
      ref,
      () => ({
        clearTimeout: () => clearTimeout(state.id),
      }),
      [clearTimeout],
    );

    state.id = setTimeout(() => {
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

      expect(timesCalled).toEqual(1);
    });
  });

  it('does not regenerate methods on multiple calls', () => {
    let lastResult: UseSetTimeoutReturnType | undefined;

    const Test = () => {
      lastResult = useSetTimeout();
      return null;
    };

    safeMount(<Test />, wrapper => {
      const result1 = lastResult!;
      lastResult = undefined;

      // Cause a re-render.
      wrapper.setProps({});

      const result2 = lastResult!;

      expect(result1.setTimeout).toBeTruthy();
      expect(result1.clearTimeout).toBeTruthy();
      expect(result1.setTimeout).toBe(result2.setTimeout);
      expect(result1.clearTimeout).toBe(result2.clearTimeout);
    });
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

// import * as React from 'react';
// import { useSetTimeout } from './useSetTimeout';
// import { safeMount } from '@uifabric/test-utilities';

// describe('useSetTimeout', () => {
//   // Initialization
//   let timesCalled = 0;

//   jest.useFakeTimers();
//   const TestComponent: React.FunctionComponent = () => {
//     const { setTimeout } = useSetTimeout();

//     setTimeout(() => {
//       timesCalled++;
//     }, 10);

//     return <div />;
//   };

//   // Cleanup
//   afterEach(() => {
//     timesCalled = 0;
//   });

//   it('updates value when mounted', () => {
//     safeMount(<TestComponent />, () => {
//       expect(timesCalled).toEqual(0);

//       jest.runOnlyPendingTimers();

//       expect(timesCalled).toEqual(1);

//       jest.runOnlyPendingTimers();

//       expect(timesCalled).toEqual(1);
//     });
//   });

//   it('does not execute the timeout when unmounted', () => {
//     safeMount(<TestComponent />, wrapper => {
//       expect(timesCalled).toEqual(0);

//       wrapper.unmount();

//       jest.runAllTimers();

//       expect(timesCalled).toEqual(0);
//     });
//   });
// });
