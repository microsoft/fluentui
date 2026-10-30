import { renderHook } from '@testing-library/react-hooks';
import type { InlineDrawerState } from './InlineDrawer.types';
import { useInlineDrawerStyles_unstable } from './useInlineDrawerStyles.styles.css';

jest.mock('./InlineDrawer.module.css', () => ({
  root: 'css-root',
  bottom: 'css-bottom',
  separator: 'css-separator',
  start: 'css-start',
  end: 'css-end',
  exit: 'css-exit',
}));

describe('useInlineDrawerStyles_unstable (CSS Modules)', () => {
  it('preserves caller classes and returns the original state', () => {
    const state = {
      root: { className: 'caller' },
      position: 'start',
      size: 'small',
      separator: false,
      animationDirection: 'enter',
    } as InlineDrawerState;
    const { result } = renderHook(() => useInlineDrawerStyles_unstable(state));
    expect(result.current).toBe(state);
    expect(result.current.root.className).toContain('fui-InlineDrawer');
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

describe('InlineDrawer state classes', () => {
  it.each(['start', 'end', 'bottom'] as const)('composes %s base classes with separator and exit state', position => {
    for (const size of ['small', 'medium', 'large', 'full'] as const) {
      for (const separator of [false, true]) {
        for (const animationDirection of ['enter', 'exit'] as const) {
          const state = {
            root: { className: 'caller' },
            position,
            size,
            separator,
            animationDirection,
          } as InlineDrawerState;
          renderHook(() => useInlineDrawerStyles_unstable(state));
          expect(state.root.className).toContain('base-root');
          expect(state.root.className).toContain(`base-${position}`);
          expect(state.root.className).toContain(`base-${size}`);
          expect(state.root.className?.includes('css-separator')).toBe(separator);
          expect(state.root.className?.includes('css-exit')).toBe(animationDirection === 'exit');
          expect(state.root.className?.endsWith('caller')).toBe(true);
        }
      }
    }
  });
});
