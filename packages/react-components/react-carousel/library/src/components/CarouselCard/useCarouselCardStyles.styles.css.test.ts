import { useCarouselCardStyles_unstable } from './useCarouselCardStyles.styles.css';
import type { CarouselCardState } from './CarouselCard.types';
jest.mock('./CarouselCard.module.css', () => ({
  autoSize: 'css-autoSize',
  elevated: 'css-elevated',
  root: 'css-root',
}));
jest.mock('../CarouselContext', () => ({
  ['useCarouselContext_unstable']: jest.fn((selector: (value: { appearance: string }) => unknown) =>
    selector({ appearance: 'elevated' }),
  ),
}));

describe('useCarouselCardStyles_unstable (CSS Modules)', () => {
  it('preserves the state and caller root class', () => {
    const state = { root: { className: 'caller-root' }, autoSize: true } as unknown as CarouselCardState;
    expect(useCarouselCardStyles_unstable(state)).toBe(state);
    expect(state.root.className).toContain('fui-CarouselCard css-root');
    expect(state.root.className?.endsWith('caller-root')).toBe(true);
    expect(state.root.className).toContain('css-elevated');
    expect(state.root.className).toContain('css-autoSize');
  });
  it('omits inactive flags and accepts absent optional slots', () => {
    const state = { root: {} } as CarouselCardState;
    useCarouselCardStyles_unstable(state);
    expect(state.root.className).not.toContain('css-selected');
    expect(state.root.className).not.toContain('css-autoSize');
    expect(state.root.className).not.toContain('css-hasAutoplay');
  });
});
