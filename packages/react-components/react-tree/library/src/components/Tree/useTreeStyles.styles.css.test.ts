import { renderHook } from '@testing-library/react-hooks';
import type { TreeState } from './Tree.types';
import { useTreeStyles_unstable } from './useTreeStyles.styles.css';

jest.mock('./Tree.module.css', () => ({
  root: 'css-root',
  subtree: 'css-subtree',
}));

describe('useTreeStyles_unstable (CSS Modules)', () => {
  it('preserves caller classes and returns the original state', () => {
    const state = { root: { className: 'caller' }, level: 1 } as TreeState;
    const { result } = renderHook(() => useTreeStyles_unstable(state));
    expect(result.current).toBe(state);
    expect(result.current.root.className).toContain('fui-Tree');
    expect(result.current.root.className).toContain('css-root');
    expect(result.current.root.className?.endsWith('caller')).toBe(true);
  });
});

describe('Tree state classes', () => {
  it.each([1, 2, 10])('maps level %s to the subtree spacing class', level => {
    const state = { root: {}, level } as TreeState;
    renderHook(() => useTreeStyles_unstable(state));
    expect(state.root.className?.includes('css-subtree')).toBe(level > 1);
  });
});
