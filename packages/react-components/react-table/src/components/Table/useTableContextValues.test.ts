import * as React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { useTable_unstable } from './useTable';
import { useTableContextValues_unstable } from './useTableContextValues';

describe('useTableContextValues', () => {
  it('should return context values from state', () => {
    const { result } = renderHook(() => {
      const state = useTable_unstable({}, React.createRef());
      return useTableContextValues_unstable(state);
    });

    expect(result.current).toMatchInlineSnapshot(`
      Object {
        "table": Object {
          "noNativeElements": false,
          "size": "medium",
          "sortable": false,
        },
      }
    `);
  });
});
