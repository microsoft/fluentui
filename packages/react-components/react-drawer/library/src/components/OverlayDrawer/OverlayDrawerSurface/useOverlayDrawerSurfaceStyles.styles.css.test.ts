import { renderHook } from '@testing-library/react-hooks';
import type { DialogSurfaceState as OverlayDrawerSurfaceState } from '@fluentui/react-dialog';
import { useOverlayDrawerSurfaceStyles_unstable } from './useOverlayDrawerSurfaceStyles.styles.css';

jest.mock('./OverlayDrawerSurface.module.css', () => ({
  backdrop: 'css-backdrop',
  nested: 'css-nested',
  hidden: 'css-hidden',
  root: 'css-root',
}));

describe('useOverlayDrawerSurfaceStyles_unstable (CSS Modules)', () => {
  it('preserves caller classes and returns the original state', () => {
    const state = {
      root: { className: 'caller' },
      backdrop: { className: 'backdrop-caller' },
      open: true,
      unmountOnClose: true,
    } as OverlayDrawerSurfaceState;
    const { result } = renderHook(() => useOverlayDrawerSurfaceStyles_unstable(state));
    expect(result.current).toBe(state);
    expect(result.current.backdrop?.className).toBe('css-backdrop backdrop-caller');
  });
});

describe('OverlayDrawerSurface backdrop state classes', () => {
  it.each([false, true])('maps nesting=%s independently from mounted visibility', treatBackdropAsNested => {
    for (const open of [false, true]) {
      for (const unmountOnClose of [false, true]) {
        const state = {
          root: { className: 'untouched' },
          backdrop: { className: 'caller' },
          treatBackdropAsNested,
          open,
          unmountOnClose,
        } as OverlayDrawerSurfaceState;
        renderHook(() => useOverlayDrawerSurfaceStyles_unstable(state));
        expect(state.root.className).toBe('untouched');
        expect(state.backdrop?.className?.includes('css-nested')).toBe(treatBackdropAsNested);
        expect(state.backdrop?.className?.includes('css-hidden')).toBe(!open && !unmountOnClose);
        expect(state.backdrop?.className?.endsWith('caller')).toBe(true);
      }
    }
  });
  it('allows an absent backdrop', () => {
    const state = { root: {} } as OverlayDrawerSurfaceState;
    expect(() => renderHook(() => useOverlayDrawerSurfaceStyles_unstable(state))).not.toThrow();
  });
});
