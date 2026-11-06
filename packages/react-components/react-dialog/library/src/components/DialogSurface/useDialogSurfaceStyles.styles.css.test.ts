import { renderHook } from '@testing-library/react-hooks';
import type { DialogSurfaceState } from './DialogSurface.types';
import { useDialogSurfaceStyles_unstable } from './useDialogSurfaceStyles.styles.css';

jest.mock('./DialogSurface.module.css', () => ({
  root: 'css-root',
  backdrop: 'css-backdrop',
  transparent: 'css-transparent',
  hidden: 'css-hidden',
}));

describe('useDialogSurfaceStyles_unstable (CSS Modules)', () => {
  it('preserves caller classes and returns the original state', () => {
    const state = { root: { className: 'caller' }, open: true, unmountOnClose: true } as DialogSurfaceState;
    const { result } = renderHook(() => useDialogSurfaceStyles_unstable(state));
    expect(result.current).toBe(state);
    expect(result.current.root.className).toContain('fui-DialogSurface');
    expect(result.current.root.className).toContain('css-root');
    expect(result.current.root.className?.endsWith('caller')).toBe(true);
  });
});

describe('DialogSurface state classes', () => {
  it.each([undefined, 'dimmed', 'transparent'] as const)(
    'maps %s backdrop appearance with nesting and visibility',
    backdropAppearance => {
      for (const treatBackdropAsNested of [false, true]) {
        for (const open of [false, true]) {
          for (const unmountOnClose of [false, true]) {
            const state = {
              root: { className: 'caller' },
              backdrop: { className: 'backdrop-caller' },
              backdropAppearance,
              treatBackdropAsNested,
              open,
              unmountOnClose,
            } as DialogSurfaceState;
            renderHook(() => useDialogSurfaceStyles_unstable(state));
            expect(state.root.className?.includes('css-hidden')).toBe(!open && !unmountOnClose);
            expect(state.backdrop?.className?.includes('css-hidden')).toBe(!open && !unmountOnClose);
            expect(state.backdrop?.className?.includes('css-transparent')).toBe(
              backdropAppearance ? backdropAppearance === 'transparent' : treatBackdropAsNested,
            );
            expect(state.backdrop?.className?.endsWith('backdrop-caller')).toBe(true);
          }
        }
      }
    },
  );
});
