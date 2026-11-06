import { useCarouselNavContainerStyles_unstable } from './useCarouselNavContainerStyles.styles.css';
import type { CarouselNavContainerState } from './CarouselNavContainer.types';
jest.mock('./CarouselNavContainer.module.css', () => ({
  autoplay: 'css-autoplay',
  hasAutoplay: 'css-hasAutoplay',
  inline: 'css-inline',
  'inline-wide': 'css-inline-wide',
  next: 'css-next',
  overlay: 'css-overlay',
  'overlay-expanded': 'css-overlay-expanded',
  'overlay-wide': 'css-overlay-wide',
  prev: 'css-prev',
  root: 'css-root',
}));

describe('useCarouselNavContainerStyles_unstable (CSS Modules)', () => {
  it('preserves the state and caller root class', () => {
    const state = {
      root: { className: 'caller-root' },
      layout: 'overlay-wide',
      next: { className: 'caller-next' },
      prev: { className: 'caller-prev' },
      autoplay: { className: 'caller-autoplay' },
    } as unknown as CarouselNavContainerState;
    expect(useCarouselNavContainerStyles_unstable(state)).toBe(state);
    expect(state.root.className).toContain('fui-CarouselNavContainer css-root');
    expect(state.root.className?.endsWith('caller-root')).toBe(true);
    expect(state.root.className).toContain('css-overlay-wide css-hasAutoplay');
    expect(state.next?.className).toBe('fui-CarouselNavContainer__next css-next caller-next');
    expect(state.prev?.className).toBe('fui-CarouselNavContainer__prev css-prev caller-prev');
    expect(state.autoplay?.className).toBe('fui-CarouselNavContainer__autoplay css-autoplay caller-autoplay');
  });
  it('omits inactive flags and accepts absent optional slots', () => {
    const state = { root: {}, layout: 'inline' } as CarouselNavContainerState;
    useCarouselNavContainerStyles_unstable(state);
    expect(state.root.className).not.toContain('css-selected');
    expect(state.root.className).not.toContain('css-autoSize');
    expect(state.root.className).not.toContain('css-hasAutoplay');
  });
  it.each(['inline', 'inline-wide', 'overlay', 'overlay-wide', 'overlay-expanded'] as const)(
    'owns the %s layout on the root',
    layout => {
      const state = { root: {}, next: {}, prev: {}, layout } as CarouselNavContainerState;
      useCarouselNavContainerStyles_unstable(state);
      expect(state.root.className).toContain(`css-${layout}`);
      expect(state.next?.className).not.toContain(`css-${layout}`);
      expect(state.prev?.className).not.toContain(`css-${layout}`);
    },
  );
});
