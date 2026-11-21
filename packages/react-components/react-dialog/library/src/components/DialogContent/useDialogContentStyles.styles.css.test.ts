import { renderHook } from '@testing-library/react-hooks';
import type { DialogContentState } from './DialogContent.types';
import { useDialogContentStyles_unstable } from './useDialogContentStyles.styles.css';

jest.mock('./DialogContent.module.css', () => ({
  root: 'css-root',
}));

describe('useDialogContentStyles_unstable (CSS Modules)', () => {
  it('preserves caller classes and returns the original state', () => {
    const state = { root: { className: 'caller' } } as DialogContentState;
    const { result } = renderHook(() => useDialogContentStyles_unstable(state));
    expect(result.current).toBe(state);
    expect(result.current.root.className).toContain('fui-DialogContent');
    expect(result.current.root.className).toContain('css-root');
    expect(result.current.root.className?.endsWith('caller')).toBe(true);
  });
});
