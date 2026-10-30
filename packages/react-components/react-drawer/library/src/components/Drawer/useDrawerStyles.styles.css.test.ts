import { renderHook } from '@testing-library/react-hooks';
import type { DrawerState } from './Drawer.types';
import { useDrawerStyles_unstable } from './useDrawerStyles.styles.css';

describe('useDrawerStyles_unstable (CSS Modules)', () => {
  it('preserves caller classes and returns the original state', () => {
    const state = { root: { className: 'caller' } } as DrawerState;
    const { result } = renderHook(() => useDrawerStyles_unstable(state));
    expect(result.current).toBe(state);
    expect(result.current.root.className).toContain('fui-Drawer');
    expect(result.current.root.className?.endsWith('caller')).toBe(true);
  });
});
