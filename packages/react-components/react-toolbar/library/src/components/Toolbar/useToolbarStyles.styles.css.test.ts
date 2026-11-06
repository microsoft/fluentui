import { renderHook } from '@testing-library/react-hooks';
import type { ToolbarState } from './Toolbar.types';
import { useToolbarStyles_unstable } from './useToolbarStyles.styles.css';

jest.mock('./Toolbar.module.css', () => ({
  root: 'css-root',
  vertical: 'css-vertical',
  small: 'css-small',
  medium: 'css-medium',
  large: 'css-large',
}));

describe('useToolbarStyles_unstable (CSS Modules)', () => {
  it('preserves caller classes and returns the original state', () => {
    const state = { root: { className: 'caller' }, size: 'medium', vertical: false } as ToolbarState;
    const { result } = renderHook(() => useToolbarStyles_unstable(state));
    expect(result.current).toBe(state);
    expect(result.current.root.className).toContain('fui-Toolbar');
    expect(result.current.root.className).toContain('css-root');
    expect(result.current.root.className?.endsWith('caller')).toBe(true);
  });
});

describe('Toolbar state classes', () => {
  it.each(['small', 'medium', 'large'] as const)('maps %s size and vertical orientation independently', size => {
    for (const vertical of [false, true]) {
      const state = { root: { className: 'caller' }, size, vertical } as ToolbarState;
      renderHook(() => useToolbarStyles_unstable(state));
      expect(state.root.className).toContain(`css-${size}`);
      expect(state.root.className?.includes('css-vertical')).toBe(vertical);
      expect(state.root.className?.endsWith('caller')).toBe(true);
    }
  });
});
