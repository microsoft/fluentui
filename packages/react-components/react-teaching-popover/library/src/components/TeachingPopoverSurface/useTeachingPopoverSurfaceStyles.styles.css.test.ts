import { usePopoverSurfaceStyles_unstable } from '@fluentui/react-popover';
import { useTeachingPopoverSurfaceStyles_unstable } from './useTeachingPopoverSurfaceStyles.styles.css';
import type { TeachingPopoverSurfaceState } from './TeachingPopoverSurface.types';

jest.mock('@fluentui/react-popover', () => ({
  ['usePopoverSurfaceStyles_unstable']: jest.fn((state: TeachingPopoverSurfaceState) => {
    state.root.className = `base-root ${state.root.className ?? ''}`;
    return { ...state, arrowClassName: 'base-arrow' };
  }),
}));

jest.mock('./TeachingPopoverSurface.module.css', () => ({ root: 'root' }));

describe('useTeachingPopoverSurfaceStyles_unstable (CSS Modules)', () => {
  it('adds local classes before calling PopoverSurface and returns base arrow styling', () => {
    const state = { root: { className: 'caller' } } as unknown as TeachingPopoverSurfaceState;

    const result = useTeachingPopoverSurfaceStyles_unstable(state);
    expect(usePopoverSurfaceStyles_unstable).toHaveBeenLastCalledWith(state);
    expect(result.root.className).toBe('base-root fui-TeachingPopoverSurface root caller');
    expect(result.arrowClassName).toBe('base-arrow');
    expect(result).not.toBe(state);
  });

  it('accepts absent caller classes', () => {
    const state = { root: {} } as TeachingPopoverSurfaceState;
    expect(useTeachingPopoverSurfaceStyles_unstable(state).root.className).toBe(
      'base-root fui-TeachingPopoverSurface root',
    );
  });
});
