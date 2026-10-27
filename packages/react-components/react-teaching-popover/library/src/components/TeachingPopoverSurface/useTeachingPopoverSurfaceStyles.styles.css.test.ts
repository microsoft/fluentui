import { useTeachingPopoverSurfaceStyles_unstable } from './useTeachingPopoverSurfaceStyles.styles.css';
import type { TeachingPopoverSurfaceState } from './TeachingPopoverSurface.types';

jest.mock('@fluentui/react-popover', () => ({
  // eslint-disable-next-line @typescript-eslint/naming-convention
  usePopoverSurfaceStyles_unstable: (state: unknown) => state,
}));

jest.mock('./TeachingPopoverSurface.module.css', () => ({ root: 'root' }));

describe('useTeachingPopoverSurfaceStyles_unstable (CSS Modules)', () => {
  it('applies the root class and keeps the caller class last', () => {
    const state = { root: { className: 'caller' } } as unknown as TeachingPopoverSurfaceState;

    expect(useTeachingPopoverSurfaceStyles_unstable(state).root.className).toBe(
      'fui-TeachingPopoverSurface root caller',
    );
  });
});
