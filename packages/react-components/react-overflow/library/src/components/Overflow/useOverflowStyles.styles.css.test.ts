import * as React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { useOverflow_unstable } from './useOverflow';
import { useOverflowStyles_unstable } from './useOverflowStyles.styles.css';

jest.mock('./Overflow.module.css', () => ({
  overflowMenu: 'css-overflow-menu',
  overflowingItems: 'css-overflowing-items',
}));

describe('useOverflowStyles_unstable (CSS Modules)', () => {
  it('applies overflow selectors to the cloned child and preserves its class name', () => {
    const child = React.createElement('div', { className: 'consumer-class' });
    const { result } = renderHook(() => {
      const state = useOverflow_unstable({ children: child }, null);
      return useOverflowStyles_unstable(state);
    });

    expect(result.current.className).toBe('fui-Overflow css-overflow-menu css-overflowing-items consumer-class');
    expect(result.current.children).toBe(child);
  });
});
