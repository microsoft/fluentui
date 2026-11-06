import { renderHook } from '@testing-library/react-hooks';
import type { MenuDividerState } from './MenuDivider.types';
import { useMenuDividerStyles_unstable } from './useMenuDividerStyles.styles.css';

jest.mock('./MenuDivider.module.css', () => ({
  root: 'css-menu-divider-root',
}));

describe('useMenuDividerStyles_unstable (CSS Modules)', () => {
  it('applies the root class and preserves the caller class name', () => {
    const state: MenuDividerState = {
      components: { root: 'div' },
      root: { className: 'consumer-class' },
    };
    const { result } = renderHook(() => useMenuDividerStyles_unstable(state));

    expect(result.current.root.className).toBe('fui-MenuDivider css-menu-divider-root consumer-class');
    expect(result.current).toBe(state);
  });
});
