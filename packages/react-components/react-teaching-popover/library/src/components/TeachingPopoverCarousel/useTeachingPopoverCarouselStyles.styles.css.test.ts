import { useTeachingPopoverCarouselStyles_unstable } from './useTeachingPopoverCarouselStyles.styles.css';
import type { TeachingPopoverCarouselState } from './TeachingPopoverCarousel.types';

jest.mock('./TeachingPopoverCarousel.module.css', () => ({ root: 'root' }));

describe('useTeachingPopoverCarouselStyles_unstable (CSS Modules)', () => {
  it('applies the root class and keeps the caller class last', () => {
    const state = { root: { className: 'caller' } } as unknown as TeachingPopoverCarouselState;

    expect(useTeachingPopoverCarouselStyles_unstable(state).root.className).toBe(
      'fui-TeachingPopoverCarousel root caller',
    );
  });
});
