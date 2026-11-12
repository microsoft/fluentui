import { renderHook } from '@testing-library/react-hooks';
import type { DialogActionsState } from './DialogActions.types';
import { useDialogActionsStyles_unstable } from './useDialogActionsStyles.styles.css';

jest.mock('./DialogActions.module.css', () => ({
  root: 'css-root',
  start: 'css-start',
  end: 'css-end',
  fluid: 'css-fluid',
}));

describe('useDialogActionsStyles_unstable (CSS Modules)', () => {
  it('preserves caller classes and returns the original state', () => {
    const state = { root: { className: 'caller' }, position: 'end', fluid: false } as DialogActionsState;
    const { result } = renderHook(() => useDialogActionsStyles_unstable(state));
    expect(result.current).toBe(state);
    expect(result.current.root.className).toContain('fui-DialogActions');
    expect(result.current.root.className).toContain('css-root');
    expect(result.current.root.className?.endsWith('caller')).toBe(true);
  });
});

describe('DialogActions state classes', () => {
  it.each(['start', 'end'] as const)('maps %s position and fluid independently', position => {
    for (const fluid of [false, true]) {
      const state = { root: { className: 'caller' }, position, fluid } as DialogActionsState;
      renderHook(() => useDialogActionsStyles_unstable(state));
      expect(state.root.className).toBe(
        `fui-DialogActions css-root css-${position}${fluid ? ' css-fluid' : ''} caller`,
      );
    }
  });
});
