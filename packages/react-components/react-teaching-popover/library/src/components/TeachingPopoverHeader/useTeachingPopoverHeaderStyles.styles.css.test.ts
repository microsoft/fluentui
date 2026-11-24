import { useTeachingPopoverHeaderStyles_unstable } from './useTeachingPopoverHeaderStyles.styles.css';
import type { TeachingPopoverHeaderState } from './TeachingPopoverHeader.types';

jest.mock('./TeachingPopoverHeader.module.css', () => ({
  root: 'root',
  brand: 'brand',
  dismissButton: 'dismiss',
  icon: 'icon',
}));

const makeState = (appearance?: 'brand') =>
  ({
    appearance,
    root: { className: 'caller-root' },
    dismissButton: { className: 'caller-dismiss' },
    icon: { className: 'caller-icon' },
  } as unknown as TeachingPopoverHeaderState);

describe('useTeachingPopoverHeaderStyles_unstable (CSS Modules)', () => {
  it('applies slot classes without brand', () => {
    const state = makeState();
    useTeachingPopoverHeaderStyles_unstable(state);

    expect(state.root.className).toBe('fui-TeachingPopoverHeader root caller-root');
    expect(state.dismissButton?.className).toBe('fui-TeachingPopoverHeader__dismissButton dismiss caller-dismiss');
    expect(state.icon?.className).toBe('fui-TeachingPopoverHeader__icon icon caller-icon');
  });

  it('applies brand class to each slot', () => {
    const state = makeState('brand');
    useTeachingPopoverHeaderStyles_unstable(state);

    expect(state.root.className).toBe('fui-TeachingPopoverHeader root brand caller-root');
    expect(state.dismissButton?.className).toContain('dismiss brand caller-dismiss');
    expect(state.icon?.className).toContain('icon brand caller-icon');
  });
});
