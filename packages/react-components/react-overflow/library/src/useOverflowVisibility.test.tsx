import * as React from 'react';
import { renderHook } from '@testing-library/react-hooks';
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
});
