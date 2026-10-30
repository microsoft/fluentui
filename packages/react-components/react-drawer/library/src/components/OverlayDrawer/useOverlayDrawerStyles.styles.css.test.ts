import { renderHook } from '@testing-library/react-hooks';
import type { OverlayDrawerState } from './OverlayDrawer.types';
import { useOverlayDrawerStyles_unstable } from './useOverlayDrawerStyles.styles.css';

jest.mock('./OverlayDrawer.module.css', () => ({
  root: 'css-root',
  bottom: 'css-bottom',
  absolute: 'css-absolute',
}));

describe('useOverlayDrawerStyles_unstable (CSS Modules)', () => {
  it('preserves caller classes and returns the original state', () => {
    const state = {
      root: { className: 'caller' },
      position: 'start',
      size: 'small',
    } as OverlayDrawerState;
    const { result } = renderHook(() => useOverlayDrawerStyles_unstable(state));
    expect(result.current).toBe(state);
    expect(result.current.root.className).toContain('fui-OverlayDrawer');
    expect(result.current.root.className).toContain('css-root');
    expect(result.current.root.className?.endsWith('caller')).toBe(true);
  });
});

jest.mock('../../shared/DrawerBase.module.css', () => ({
  root: 'base-root',
  start: 'base-start',
  end: 'base-end',
  bottom: 'base-bottom',
  small: 'base-small',
  medium: 'base-medium',
  large: 'base-large',
  full: 'base-full',
  'bottom-full': 'base-bottom-full',
}));

describe('OverlayDrawer state classes', () => {
  it.each([false, true])('maps mount node positioning=%s on the portaled backdrop too', hasMountNodeElement => {
    const state = {
      root: { className: 'caller', backdrop: { className: 'backdrop-caller' } },
      position: 'bottom',
      size: 'full',
      hasMountNodeElement,
    } as OverlayDrawerState;
    renderHook(() => useOverlayDrawerStyles_unstable(state));
    expect(state.root.className).toContain('base-full');
    expect(state.root.className?.includes('css-absolute')).toBe(hasMountNodeElement);
    const backdrop = state.root.backdrop as { className: string };
    expect(backdrop.className.includes('css-absolute')).toBe(hasMountNodeElement);
    expect(backdrop.className.endsWith('backdrop-caller')).toBe(true);
  });
});
