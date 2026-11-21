import { useTeachingPopoverCarouselFooterStyles_unstable } from './useTeachingPopoverCarouselFooterStyles.styles.css';
import type { TeachingPopoverCarouselFooterState } from './TeachingPopoverCarouselFooter.types';

jest.mock('./TeachingPopoverCarouselFooter.module.css', () => ({
  root: 'root',
  centered: 'centered',
  rightAligned: 'right-aligned',
}));

const makeState = (layout?: 'centered') =>
  ({
    layout,
    root: { className: 'caller-root' },
    previous: { className: 'caller-previous' },
    next: { className: 'caller-next' },
  } as unknown as TeachingPopoverCarouselFooterState);

describe('useTeachingPopoverCarouselFooterStyles_unstable (CSS Modules)', () => {
  it('applies centered layout and slot class names', () => {
    const state = makeState('centered');
    useTeachingPopoverCarouselFooterStyles_unstable(state);

    expect(state.root.className).toBe('fui-TeachingPopoverCarouselFooter root centered caller-root');
    expect(state.previous?.className).toBe('fui-TeachingPopoverCarouselFooter__previous caller-previous');
    expect(state.next.className).toBe('fui-TeachingPopoverCarouselFooter__next caller-next');
  });

  it('defaults to right aligned and skips missing previous slot', () => {
    const state = makeState();
    state.previous = undefined;
    useTeachingPopoverCarouselFooterStyles_unstable(state);

    expect(state.root.className).toBe('fui-TeachingPopoverCarouselFooter root right-aligned caller-root');
  });
});
