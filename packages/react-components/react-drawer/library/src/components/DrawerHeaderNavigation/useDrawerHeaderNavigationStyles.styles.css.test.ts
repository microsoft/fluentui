import { renderHook } from '@testing-library/react-hooks';
import type { DrawerHeaderNavigationState } from './DrawerHeaderNavigation.types';
import { useDrawerHeaderNavigationStyles_unstable } from './useDrawerHeaderNavigationStyles.styles.css';

jest.mock('./DrawerHeaderNavigation.module.css', () => ({
  root: 'css-root',
}));

describe('useDrawerHeaderNavigationStyles_unstable (CSS Modules)', () => {
  it('preserves caller classes and returns the original state', () => {
    const state = { root: { className: 'caller' } } as DrawerHeaderNavigationState;
    const { result } = renderHook(() => useDrawerHeaderNavigationStyles_unstable(state));
    expect(result.current).toBe(state);
    expect(result.current.root.className).toContain('fui-DrawerHeaderNavigation');
    expect(result.current.root.className).toContain('css-root');
    expect(result.current.root.className?.endsWith('caller')).toBe(true);
  });
});
