import { renderHook } from '@testing-library/react-hooks';
import type { DrawerBaseState } from './DrawerBase.types';
import {
  drawerCSSVars,
  drawerDefaultStyles,
  useDrawerBaseClassNames,
  useDrawerBottomBaseStyles,
  useDrawerDefaultClassName,
} from './useDrawerBaseStyles.styles.css';
jest.mock('./DrawerBase.module.css', () => ({
  root: 'css-root',
  start: 'css-start',
  end: 'css-end',
  bottom: 'css-bottom',
  small: 'css-small',
  medium: 'css-medium',
  large: 'css-large',
  full: 'css-full',
  'bottom-full': 'css-bottom-full',
}));
describe('Drawer CSS Modules helpers', () => {
  it.each(['start', 'end', 'bottom'] as const)('maps %s positioning and every size', position => {
    for (const size of ['small', 'medium', 'large', 'full'] as const) {
      const { result } = renderHook(() => useDrawerBaseClassNames({ position, size } as DrawerBaseState));
      expect(result.current).toBe(`css-${position} css-${size}`);
    }
  });
  it('preserves the bottom size map, reset, and CSS variable contracts', () => {
    const { result } = renderHook(() => useDrawerBottomBaseStyles());
    expect(result.current.full).toBe('css-bottom-full');
    expect(useDrawerDefaultClassName()).toBe('css-root');
    expect(drawerCSSVars.drawerSizeVar).toBe('--fui-Drawer--size');
    expect(drawerDefaultStyles.width).toBe('var(--fui-Drawer--size)');
  });
});
