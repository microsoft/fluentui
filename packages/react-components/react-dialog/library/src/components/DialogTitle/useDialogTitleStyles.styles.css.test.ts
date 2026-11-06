import { renderHook } from '@testing-library/react-hooks';
import type { DialogTitleState } from './DialogTitle.types';
import { useDialogTitleStyles_unstable, useDialogTitleInternalStyles } from './useDialogTitleStyles.styles.css';

jest.mock('./DialogTitle.module.css', () => ({
  root: 'css-root',
  withoutAction: 'css-withoutAction',
  action: 'css-action',
  internalAction: 'css-internalAction',
}));

describe('useDialogTitleStyles_unstable (CSS Modules)', () => {
  it('preserves caller classes and returns the original state', () => {
    const state = { root: { className: 'caller' } } as DialogTitleState;
    const { result } = renderHook(() => useDialogTitleStyles_unstable(state));
    expect(result.current).toBe(state);
    expect(result.current.root.className).toContain('fui-DialogTitle');
    expect(result.current.root.className).toContain('css-root');
    expect(result.current.root.className?.endsWith('caller')).toBe(true);
  });
  it('retains the internal action helper contract', () => {
    const { result } = renderHook(() => useDialogTitleInternalStyles());
    expect(result.current).toBe('css-internalAction');
  });
});

describe('DialogTitle state classes', () => {
  it('styles the sibling action without leaking root state classes', () => {
    const state = { root: { className: 'caller' }, action: { className: 'action-caller' } } as DialogTitleState;
    renderHook(() => useDialogTitleStyles_unstable(state));
    expect(state.root.className).toBe('fui-DialogTitle css-root caller');
    expect(state.action?.className).toBe('fui-DialogTitle__action css-action action-caller');
  });
  it('extends the title grid when the action is absent', () => {
    const state = { root: {} } as DialogTitleState;
    renderHook(() => useDialogTitleStyles_unstable(state));
    expect(state.root.className).toContain('css-withoutAction');
  });
});
