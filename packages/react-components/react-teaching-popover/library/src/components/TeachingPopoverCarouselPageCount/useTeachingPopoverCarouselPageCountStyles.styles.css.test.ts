import { useTeachingPopoverCarouselPageCountStyles_unstable } from './useTeachingPopoverCarouselPageCountStyles.styles.css';
import type { TeachingPopoverCarouselPageCountState } from './TeachingPopoverCarouselPageCount.types';

jest.mock('./TeachingPopoverCarouselPageCount.module.css', () => ({ root: 'root' }));

describe('useTeachingPopoverCarouselPageCountStyles_unstable (CSS Modules)', () => {
  it('applies the root class and keeps the caller class last', () => {
    const state = { root: { className: 'caller' } } as unknown as TeachingPopoverCarouselPageCountState;

    expect(useTeachingPopoverCarouselPageCountStyles_unstable(state).root.className).toBe(
      'fui-TeachingPopoverCarouselPageCount root caller',
    );
  });
});
