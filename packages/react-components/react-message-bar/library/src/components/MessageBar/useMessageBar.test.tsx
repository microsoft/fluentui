import * as React from 'react';
import { renderHook } from '@testing-library/react';

import { useMessageBar_unstable } from './useMessageBar';

describe('useMessageBar', () => {
  it('should return state for default props', () => {
    const { result } = renderHook(() => useMessageBar_unstable({}, React.createRef<HTMLDivElement>()));

    expect(result.current).toMatchObject({
      intent: 'info',
      layout: 'singleline',
      shape: 'rounded',
    });

    expect(result.current.icon?.children).toBeDefined();
  });

  it('should return state for custom props', () => {
    const { result } = renderHook(() =>
      useMessageBar_unstable(
        {
          intent: 'error',
          layout: 'multiline',
          shape: 'square',
          icon: { children: null },
        },
        React.createRef<HTMLDivElement>(),
      ),
    );

    expect(result.current).toMatchObject({
      intent: 'error',
      layout: 'multiline',
      shape: 'square',
    });

    expect(result.current.icon?.children).toBeNull();
  });
});
