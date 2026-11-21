import { renderHook } from '@testing-library/react-hooks';
import type { DrawerBodyState } from './DrawerBody.types';
import { useDrawerBodyStyles_unstable } from './useDrawerBodyStyles.styles.css';

jest.mock('./DrawerBody.module.css', () => ({
  root: 'css-root',
}));

describe('useDrawerBodyStyles_unstable (CSS Modules)', () => {
  it('preserves caller classes and returns the original state', () => {
    const state = { root: { className: 'caller' } } as DrawerBodyState;
    const { result } = renderHook(() => useDrawerBodyStyles_unstable(state));
    expect(result.current).toBe(state);
    expect(result.current.root.className).toContain('fui-DrawerBody');
    expect(result.current.root.className).toContain('css-root');
    expect(result.current.root.className?.endsWith('caller')).toBe(true);
  });
});
