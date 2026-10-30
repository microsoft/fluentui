import { useCarouselStyles_unstable } from './useCarouselStyles.styles.css';
import type { CarouselState } from './Carousel.types';
jest.mock('./Carousel.module.css', () => ({ elevated: 'css-elevated', root: 'css-root' }));

describe('useCarouselStyles_unstable (CSS Modules)', () => {
  it('preserves the state and caller root class', () => {
    const state = { root: { className: 'caller-root' }, appearance: 'elevated' } as unknown as CarouselState;
    expect(useCarouselStyles_unstable(state)).toBe(state);
    expect(state.root.className).toContain('fui-Carousel css-root');
    expect(state.root.className?.endsWith('caller-root')).toBe(true);
    expect(state.root.className).toContain('css-elevated');
  });
  it('omits inactive flags and accepts absent optional slots', () => {
    const state = { root: {}, appearance: 'flat' } as CarouselState;
    useCarouselStyles_unstable(state);
    expect(state.root.className).not.toContain('css-selected');
    expect(state.root.className).not.toContain('css-autoSize');
    expect(state.root.className).not.toContain('css-hasAutoplay');
  });
});
