import { useCarouselNavButtonStyles_unstable } from './useCarouselNavButtonStyles.styles.css';
import type { CarouselNavButtonState } from './CarouselNavButton.types';
jest.mock('./CarouselNavButton.module.css', () => ({ brand: 'css-brand', root: 'css-root', selected: 'css-selected' }));

describe('useCarouselNavButtonStyles_unstable (CSS Modules)', () => {
  it('preserves the state and caller root class', () => {
    const state = {
      root: { className: 'caller-root' },
      selected: true,
      appearance: 'brand',
    } as unknown as CarouselNavButtonState;
    expect(useCarouselNavButtonStyles_unstable(state)).toBe(state);
    expect(state.root.className).toContain('fui-CarouselNavButton css-root');
    expect(state.root.className?.endsWith('caller-root')).toBe(true);
    expect(state.root.className).toContain('css-selected');
    expect(state.root.className).toContain('css-brand');
  });
  it('omits inactive flags and accepts absent optional slots', () => {
    const state = { root: {}, appearance: undefined } as CarouselNavButtonState;
    useCarouselNavButtonStyles_unstable(state);
    expect(state.root.className).not.toContain('css-selected');
    expect(state.root.className).not.toContain('css-autoSize');
    expect(state.root.className).not.toContain('css-hasAutoplay');
  });
  it.each([
    { selected: false, appearance: undefined },
    { selected: true, appearance: undefined },
    { selected: false, appearance: 'brand' as const },
    { selected: true, appearance: 'brand' as const },
  ])('maps selection independently of appearance ($selected, $appearance)', ({ selected, appearance }) => {
    const state = { root: {}, selected, appearance } as CarouselNavButtonState;
    useCarouselNavButtonStyles_unstable(state);
    expect(state.root.className?.includes('css-selected')).toBe(selected);
    expect(state.root.className?.includes('css-brand')).toBe(appearance === 'brand');
  });
});
