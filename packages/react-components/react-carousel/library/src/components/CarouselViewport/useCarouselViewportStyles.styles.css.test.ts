import { useCarouselViewportStyles_unstable } from './useCarouselViewportStyles.styles.css';
import type { CarouselViewportState } from './CarouselViewport.types';
jest.mock('./CarouselViewport.module.css', () => ({ root: 'css-root' }));

describe('useCarouselViewportStyles_unstable (CSS Modules)', () => {
  it('preserves the state and caller root class', () => {
    const state = { root: { className: 'caller-root' } } as unknown as CarouselViewportState;
    expect(useCarouselViewportStyles_unstable(state)).toBe(state);
    expect(state.root.className).toContain('fui-CarouselViewport css-root');
    expect(state.root.className?.endsWith('caller-root')).toBe(true);
  });
});
