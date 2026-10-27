import { useCarouselNavImageButtonStyles_unstable } from './useCarouselNavImageButtonStyles.styles.css';
import type { CarouselNavImageButtonState } from './CarouselNavImageButton.types';
jest.mock('./CarouselNavImageButton.module.css', () => ({
  image: 'css-image',
  root: 'css-root',
  selected: 'css-selected',
}));

describe('useCarouselNavImageButtonStyles_unstable (CSS Modules)', () => {
  it('preserves the state and caller root class', () => {
    const state = {
      root: { className: 'caller-root' },
      selected: true,
      image: { className: 'caller-image' },
    } as unknown as CarouselNavImageButtonState;
    expect(useCarouselNavImageButtonStyles_unstable(state)).toBe(state);
    expect(state.root.className).toContain('fui-CarouselNavImageButton css-root');
    expect(state.root.className?.endsWith('caller-root')).toBe(true);
    expect(state.root.className).toContain('css-selected');
    expect(state.image.className).toBe('fui-CarouselNavImageButton__image css-image caller-image');
    expect(state.image.className).not.toContain('css-selected');
  });
  it('omits inactive flags and accepts absent optional slots', () => {
    const state = { root: {} } as CarouselNavImageButtonState;
    useCarouselNavImageButtonStyles_unstable(state);
    expect(state.root.className).not.toContain('css-selected');
    expect(state.root.className).not.toContain('css-autoSize');
    expect(state.root.className).not.toContain('css-hasAutoplay');
  });
});
