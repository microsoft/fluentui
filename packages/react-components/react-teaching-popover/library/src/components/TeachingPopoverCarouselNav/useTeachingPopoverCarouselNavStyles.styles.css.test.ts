import { useTeachingPopoverCarouselNavStyles_unstable } from './useTeachingPopoverCarouselNavStyles.styles.css';
import type { TeachingPopoverCarouselNavState } from './TeachingPopoverCarouselNav.types';

jest.mock('./TeachingPopoverCarouselNav.module.css', () => ({ root: 'root' }));

describe('useTeachingPopoverCarouselNavStyles_unstable (CSS Modules)', () => {
  it('applies the root class and keeps the caller class last', () => {
    const state = { root: { className: 'caller' } } as unknown as TeachingPopoverCarouselNavState;

    expect(useTeachingPopoverCarouselNavStyles_unstable(state).root.className).toBe(
      'fui-TeachingPopoverCarouselNav root caller',
    );
  });
});
