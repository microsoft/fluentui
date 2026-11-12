import { useTeachingPopoverTitleStyles_unstable } from './useTeachingPopoverTitleStyles.styles.css';
import type { TeachingPopoverTitleState } from './TeachingPopoverTitle.types';

jest.mock('./TeachingPopoverTitle.module.css', () => ({
  root: 'root',
  brand: 'brand',
  dismissButton: 'dismiss',
}));

const makeState = (appearance?: 'brand') =>
  ({
    appearance,
    root: { className: 'caller-root' },
    dismissButton: { className: 'caller-dismiss' },
  } as unknown as TeachingPopoverTitleState);

describe('useTeachingPopoverTitleStyles_unstable (CSS Modules)', () => {
  it('applies slot classes without brand', () => {
    const state = makeState();
    useTeachingPopoverTitleStyles_unstable(state);

    expect(state.root.className).toBe('fui-TeachingPopoverTitle root caller-root');
    expect(state.dismissButton?.className).toBe('fui-TeachingPopoverTitle__dismissButton dismiss caller-dismiss');
  });

  it('applies brand class to root and dismiss button', () => {
    const state = makeState('brand');
    useTeachingPopoverTitleStyles_unstable(state);

    expect(state.root.className).toBe('fui-TeachingPopoverTitle root brand caller-root');
    expect(state.dismissButton?.className).toContain('dismiss brand caller-dismiss');
  });
});
