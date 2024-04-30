import { act, renderHook } from '@testing-library/react-hooks';
import { useMountedState } from './useMountedState';

describe('useMountedState', () => {
  it.each([
    // "visible={true}" overrides any state updates
    { visible: true, unmountOnExit: true, initialResult: true, afterUnmountResult: true },
    { visible: true, unmountOnExit: false, initialResult: true, afterUnmountResult: true },

    { visible: false, unmountOnExit: false, initialResult: true, afterUnmountResult: false },
    { visible: false, unmountOnExit: true, initialResult: false, afterUnmountResult: false },
  ])('handles state updates', ({ afterUnmountResult, initialResult, visible, unmountOnExit }) => {
    const { result } = renderHook(() => useMountedState(visible, unmountOnExit));

    expect(result.current[0]).toBe(initialResult);
    act(() => {
      result.current[1](false);
    });

    expect(result.current[0]).toBe(afterUnmountResult);
  });
});
