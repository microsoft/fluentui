import * as React from 'react';
import { act, renderHook } from '@testing-library/react-hooks';
import type { OverflowContextValue } from './overflowContext';
import { OverflowContext } from './overflowContext';
import { useOverflowSnapshot } from './useOverflowSnapshot';

describe('useOverflowSnapshot', () => {
  it('ignores subscription callbacks after unmount', () => {
    const getSnapshot = jest
      .fn()
      .mockReturnValueOnce({ itemVisibility: {}, groupVisibility: {}, invisibleItemCount: 0 })
      .mockReturnValue({ itemVisibility: { foo: true }, groupVisibility: {}, invisibleItemCount: 1 });

    let listener: (() => void) | undefined;
    const unsubscribe = jest.fn();
    const subscribe = jest.fn((nextListener: () => void) => {
      listener = nextListener;
      return unsubscribe;
    });

    function Wrapper(props: { children?: React.ReactNode }) {
      return (
        <OverflowContext.Provider
          value={
            {
              getSnapshot,
              subscribe,
            } as unknown as OverflowContextValue
          }
        >
          {props.children}
        </OverflowContext.Provider>
      );
    }

    const { unmount } = renderHook(() => useOverflowSnapshot(snapshot => snapshot.invisibleItemCount), {
      wrapper: Wrapper,
    });

    expect(getSnapshot).toHaveBeenCalledTimes(2);

    unmount();

    expect(unsubscribe).toHaveBeenCalledTimes(1);

    act(() => {
      listener?.();
    });

    expect(getSnapshot).toHaveBeenCalledTimes(2);
  });
});
