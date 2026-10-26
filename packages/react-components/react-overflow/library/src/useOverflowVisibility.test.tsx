import * as React from 'react';
import { act, renderHook } from '@testing-library/react-hooks';
import { useOverflowVisibility } from './useOverflowVisibility';
import type { OverflowContextValue } from './overflowContext';
import { OverflowContext } from './overflowContext';

describe('useOverflowVisibility', () => {
  it('should return item and group visiblity derived from the snapshot', () => {
    const groupVisibility = {
      foo: 'hidden',
      bar: 'overflow',
      baz: 'visible',
    } as const;

    const snapshot = {
      itemVisibility: { foo: true, bar: true, baz: false },
      groupVisibility,
      invisibleItemCount: 1,
    };

    const Wrapper: React.FC<{ children?: React.ReactNode }> = props => {
      return (
        <OverflowContext.Provider
          {...props}
          value={
            {
              getSnapshot: () => snapshot,
              subscribe: () => () => null,
            } as unknown as OverflowContextValue
          }
        />
      );
    };
    const { result } = renderHook(useOverflowVisibility, { wrapper: Wrapper });
    expect(result.current.groupVisibility).toEqual(groupVisibility);
    expect(result.current.itemVisibility).toEqual({ foo: true, bar: true, baz: false });
  });

  it('does not render again when the snapshot is unchanged during subscription', () => {
    const snapshot = {
      itemVisibility: { foo: true },
      groupVisibility: {},
      invisibleItemCount: 0,
    };
    let notify: () => void = () => undefined;
    const contextValue = {
      getSnapshot: () => snapshot,
      subscribe: (listener: () => void) => {
        notify = listener;
        return () => null;
      },
    } as unknown as OverflowContextValue;
    const Wrapper = (props: { children?: React.ReactNode }) => (
      <OverflowContext.Provider {...props} value={contextValue} />
    );
    let renderCount = 0;

    renderHook(
      () => {
        renderCount++;
        return useOverflowVisibility();
      },
      { wrapper: Wrapper },
    );

    expect(renderCount).toBe(1);

    act(() => notify());

    expect(renderCount).toBe(1);
  });
});
