import { renderHook } from '@testing-library/react-hooks';
import type { FlatTreeState } from './FlatTree.types';
import { useFlatTreeStyles_unstable } from './useFlatTreeStyles.styles.css';

jest.mock('./FlatTree.module.css', () => ({
  root: 'css-root',
}));

describe('useFlatTreeStyles_unstable (CSS Modules)', () => {
  it('preserves caller classes and returns the original state', () => {
    const state = { root: { className: 'caller' } } as FlatTreeState;
    const { result } = renderHook(() => useFlatTreeStyles_unstable(state));
    expect(result.current).toBe(state);
    expect(result.current.root.className).toContain('fui-FlatTree');
    expect(result.current.root.className).toContain('css-root');
    expect(result.current.root.className?.endsWith('caller')).toBe(true);
  });
});
