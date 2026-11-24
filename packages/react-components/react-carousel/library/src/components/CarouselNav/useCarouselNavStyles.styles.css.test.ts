import { useCarouselNavStyles_unstable } from './useCarouselNavStyles.styles.css';
import type { CarouselNavState } from './CarouselNav.types';
jest.mock('./CarouselNav.module.css', () => ({ root: 'css-root' }));

describe('useCarouselNavStyles_unstable (CSS Modules)', () => {
  it('preserves the state and caller root class', () => {
    const state = { root: { className: 'caller-root' } } as unknown as CarouselNavState;
    expect(useCarouselNavStyles_unstable(state)).toBe(state);
    expect(state.root.className).toContain('fui-CarouselNav css-root');
    expect(state.root.className?.endsWith('caller-root')).toBe(true);
  });
});
