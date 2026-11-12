import { renderHook } from '@testing-library/react-hooks';
import type { TreeItemState } from './TreeItem.types';
import { useTreeItemStyles_unstable } from './useTreeItemStyles.styles.css';

jest.mock('./TreeItem.module.css', () => ({
  root: 'css-root',
  level1: 'css-level1',
  level2: 'css-level2',
  level3: 'css-level3',
  level4: 'css-level4',
  level5: 'css-level5',
  level6: 'css-level6',
  level7: 'css-level7',
  level8: 'css-level8',
  level9: 'css-level9',
  level10: 'css-level10',
}));

describe('useTreeItemStyles_unstable (CSS Modules)', () => {
  it('preserves caller classes and returns the original state', () => {
    const state = { root: { className: 'caller' }, level: 1 } as TreeItemState;
    const { result } = renderHook(() => useTreeItemStyles_unstable(state));
    expect(result.current).toBe(state);
    expect(result.current.root.className).toContain('fui-TreeItem');
    expect(result.current.root.className).toContain('css-root');
    expect(result.current.root.className?.endsWith('caller')).toBe(true);
  });
});

describe('TreeItem state classes', () => {
  it.each([1, 2, 10])('uses a static class for level %s without modifying caller styles', level => {
    const style = { color: 'inherit' };
    const state = { root: { style }, level } as TreeItemState;
    renderHook(() => useTreeItemStyles_unstable(state));
    expect(state.root.className).toContain(`css-level${level}`);
    expect(state.root.style).toBe(style);
  });
  it('uses the dynamic variable beyond ten levels and preserves caller styles', () => {
    const state = { root: { style: { color: 'inherit' } }, level: 11 } as TreeItemState;
    renderHook(() => useTreeItemStyles_unstable(state));
    expect(state.root.className).not.toContain('css-level');
    expect(state.root.style).toEqual({ '--fluent-TreeItem--level': 11, color: 'inherit' });
  });
  it('lets a caller indentation variable override the dynamic fallback', () => {
    const state = { root: { style: { '--fluent-TreeItem--level': 42 } }, level: 20 } as TreeItemState;
    renderHook(() => useTreeItemStyles_unstable(state));
    expect(state.root.style).toEqual({ '--fluent-TreeItem--level': 42 });
  });
});
