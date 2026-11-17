import { renderHook } from '@testing-library/react-hooks';
import type { DrawerHeaderState } from './DrawerHeader.types';
import { useDrawerHeaderStyles_unstable } from './useDrawerHeaderStyles.styles.css';

jest.mock('./DrawerHeader.module.css', () => ({
  root: 'css-root',
  none: 'css-none',
  middle: 'css-middle',
  bottom: 'css-bottom',
}));

describe('useDrawerHeaderStyles_unstable (CSS Modules)', () => {
  it('preserves caller classes and returns the original state', () => {
    const state = { root: { className: 'caller' }, scrollState: 'none' } as DrawerHeaderState;
    const { result } = renderHook(() => useDrawerHeaderStyles_unstable(state));
    expect(result.current).toBe(state);
    expect(result.current.root.className).toContain('fui-DrawerHeader');
    expect(result.current.root.className).toContain('css-root');
    expect(result.current.root.className?.endsWith('caller')).toBe(true);
  });
});

describe('DrawerHeader state classes', () => {
  it.each([
    ['none', 'fui-DrawerHeader css-root css-none caller'],
    // DrawerHeader.module.css defines no `top` class, so this state adds no scroll-state class.
    ['top', 'fui-DrawerHeader css-root caller'],
    ['middle', 'fui-DrawerHeader css-root css-middle caller'],
    ['bottom', 'fui-DrawerHeader css-root css-bottom caller'],
  ] as const)('maps %s scroll state on the separator owner', (scrollState, expected) => {
    const state = { root: { className: 'caller' }, scrollState } as DrawerHeaderState;
    renderHook(() => useDrawerHeaderStyles_unstable(state));
    expect(state.root.className).toBe(expected);
  });
});
