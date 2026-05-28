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
      visibleItems: [
        { id: 'foo', element: document.createElement('div'), priority: 0 },
        { id: 'bar', element: document.createElement('div'), priority: 0 },
      ],
      invisibleItems: [{ id: 'baz', element: document.createElement('div'), priority: 0 }],
      groupVisibility,
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
