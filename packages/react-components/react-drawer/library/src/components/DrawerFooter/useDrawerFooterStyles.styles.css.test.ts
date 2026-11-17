import { renderHook } from '@testing-library/react-hooks';
import type { DrawerFooterState } from './DrawerFooter.types';
import { useDrawerFooterStyles_unstable } from './useDrawerFooterStyles.styles.css';

jest.mock('./DrawerFooter.module.css', () => ({
  root: 'css-root',
  none: 'css-none',
  middle: 'css-middle',
  top: 'css-top',
}));

describe('useDrawerFooterStyles_unstable (CSS Modules)', () => {
  it('preserves caller classes and returns the original state', () => {
    const state = { root: { className: 'caller' }, scrollState: 'none' } as DrawerFooterState;
    const { result } = renderHook(() => useDrawerFooterStyles_unstable(state));
    expect(result.current).toBe(state);
    expect(result.current.root.className).toContain('fui-DrawerFooter');
    expect(result.current.root.className).toContain('css-root');
    expect(result.current.root.className?.endsWith('caller')).toBe(true);
  });
});

describe('DrawerFooter state classes', () => {
  it.each([
    ['none', 'fui-DrawerFooter css-root css-none caller'],
    ['top', 'fui-DrawerFooter css-root css-top caller'],
    ['middle', 'fui-DrawerFooter css-root css-middle caller'],
    // DrawerFooter.module.css defines no `bottom` class, so this state adds no scroll-state class.
    ['bottom', 'fui-DrawerFooter css-root caller'],
  ] as const)('maps %s scroll state on the separator owner', (scrollState, expected) => {
    const state = { root: { className: 'caller' }, scrollState } as DrawerFooterState;
    renderHook(() => useDrawerFooterStyles_unstable(state));
    expect(state.root.className).toBe(expected);
  });
});
