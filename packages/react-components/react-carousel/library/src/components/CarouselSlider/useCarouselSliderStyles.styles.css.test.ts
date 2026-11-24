import { useCarouselSliderStyles_unstable } from './useCarouselSliderStyles.styles.css';
import type { CarouselSliderState } from './CarouselSlider.types';
jest.mock('./CarouselSlider.module.css', () => ({ elevated: 'css-elevated', root: 'css-root' }));
jest.mock('../CarouselContext', () => ({
  ['useCarouselContext_unstable']: jest.fn((selector: (value: { appearance: string }) => unknown) =>
    selector({ appearance: 'elevated' }),
  ),
}));

describe('useCarouselSliderStyles_unstable (CSS Modules)', () => {
  it('preserves the state and caller root class', () => {
    const state = { root: { className: 'caller-root' } } as unknown as CarouselSliderState;
    expect(useCarouselSliderStyles_unstable(state)).toBe(state);
    expect(state.root.className).toContain('fui-CarouselSlider css-root');
    expect(state.root.className?.endsWith('caller-root')).toBe(true);
    expect(state.root.className).toContain('css-elevated');
  });
});
