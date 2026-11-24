import { useTeachingPopoverCarouselCardStyles_unstable } from './useTeachingPopoverCarouselCardStyles.styles.css';
import type { TeachingPopoverCarouselCardState } from './TeachingPopoverCarouselCard.types';

jest.mock('./TeachingPopoverCarouselCard.module.css', () => ({ root: 'root' }));

describe('useTeachingPopoverCarouselCardStyles_unstable (CSS Modules)', () => {
  it('applies the root class and keeps the caller class last', () => {
    const state = { root: { className: 'caller' } } as unknown as TeachingPopoverCarouselCardState;

    expect(useTeachingPopoverCarouselCardStyles_unstable(state).root.className).toBe(
      'fui-TeachingPopoverCarouselCard root caller',
    );
  });
});
