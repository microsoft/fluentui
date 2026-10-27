import { renderHook } from '@testing-library/react-hooks';
import type { MenuGridState } from './MenuGrid.types';
import { useMenuGridStyles_unstable } from './useMenuGridStyles.styles.css';

jest.mock('./MenuGrid.module.css', () => ({
  root: 'css-menu-grid-root',
}));

describe('useMenuGridStyles_unstable (CSS Modules)', () => {
  it('applies the root class and preserves the caller class name', () => {
    const state: MenuGridState = {
      components: { root: 'div' },
      root: { className: 'consumer-class' },
      tableRowTabsterAttribute: null,
    };
    const { result } = renderHook(() => useMenuGridStyles_unstable(state));

    expect(result.current.root.className).toBe('fui-MenuGrid css-menu-grid-root consumer-class');
    expect(result.current).toBe(state);
  });
});
