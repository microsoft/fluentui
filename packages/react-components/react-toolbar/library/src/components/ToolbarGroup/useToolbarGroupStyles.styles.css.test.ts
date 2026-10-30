import { renderHook } from '@testing-library/react-hooks';
import type { ToolbarGroupState } from './ToolbarGroup.types';
import { useToolbarGroupStyles_unstable } from './useToolbarGroupStyles.styles.css';

jest.mock('./ToolbarGroup.module.css', () => ({
  root: 'css-root',
  vertical: 'css-vertical',
}));

describe('useToolbarGroupStyles_unstable (CSS Modules)', () => {
  it('preserves caller classes and returns the original state', () => {
    const state = { root: { className: 'caller' } } as ToolbarGroupState;
    const { result } = renderHook(() => useToolbarGroupStyles_unstable(state));
    expect(result.current).toBe(state);
    expect(result.current.root.className).toContain('fui-ToolbarGroup');
    expect(result.current.root.className).toContain('css-root');
    expect(result.current.root.className?.endsWith('caller')).toBe(true);
  });
});

describe('ToolbarGroup state classes', () => {
  it.each([false, true])('maps vertical=%s', vertical => {
    const state = { root: {}, vertical } as ToolbarGroupState;
    renderHook(() => useToolbarGroupStyles_unstable(state));
    expect(state.root.className?.includes('css-vertical')).toBe(vertical);
  });
});
