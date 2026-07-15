import * as React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import type { OverflowContextValue } from './overflowContext';
import { OverflowContext } from './overflowContext';
import { useOverflowSnapshot } from './useOverflowSnapshot';

describe('useOverflowSnapshot', () => {
  it('unsubscribes on unmount', () => {
    const getSnapshot = jest
      .fn()
      .mockReturnValueOnce({ itemVisibility: {}, groupVisibility: {}, invisibleItemCount: 0 })
      .mockReturnValue({ itemVisibility: { foo: true }, groupVisibility: {}, invisibleItemCount: 1 });

    const unsubscribe = jest.fn();
    const subscribe = jest.fn(() => unsubscribe);

    function wrapper(props: { children?: React.ReactNode }) {
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
      wrapper,
    });

    expect(getSnapshot).toHaveBeenCalledTimes(2);

    unmount();

    expect(unsubscribe).toHaveBeenCalledTimes(1);
  });
});
