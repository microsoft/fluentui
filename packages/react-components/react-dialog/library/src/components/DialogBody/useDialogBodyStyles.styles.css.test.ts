import { renderHook } from '@testing-library/react-hooks';
import type { DialogBodyState } from './DialogBody.types';
import { useDialogBodyStyles_unstable } from './useDialogBodyStyles.styles.css';

jest.mock('./DialogBody.module.css', () => ({
  root: 'css-root',
}));

describe('useDialogBodyStyles_unstable (CSS Modules)', () => {
  it('preserves caller classes and returns the original state', () => {
    const state = { root: { className: 'caller' } } as DialogBodyState;
    const { result } = renderHook(() => useDialogBodyStyles_unstable(state));
    expect(result.current).toBe(state);
    expect(result.current.root.className).toContain('fui-DialogBody');
    expect(result.current.root.className).toContain('css-root');
    expect(result.current.root.className?.endsWith('caller')).toBe(true);
  });
});
