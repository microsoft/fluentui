import { useCarouselAutoplayButtonStyles_unstable } from './useCarouselAutoplayButtonStyles.styles.css';
import type { CarouselAutoplayButtonState } from './CarouselAutoplayButton.types';

jest.mock('./CarouselAutoplayButton.module.css', () => ({ root: 'css-root' }));
jest.mock('@fluentui/react-button', () => ({
  ['useToggleButtonStyles_unstable']: jest.fn((state: { root: { className?: string } }) => {
    state.root.className = `base-root ${state.root.className ?? ''}`;
    return state;
  }),
}));

describe('useCarouselAutoplayButtonStyles_unstable (CSS Modules)', () => {
  it('composes the public base hook and preserves caller classes last', () => {
    const state = {
      root: { className: 'caller-root' },
      icon: { className: 'caller-icon' },
    } as CarouselAutoplayButtonState;
    expect(useCarouselAutoplayButtonStyles_unstable(state)).toBe(state);
    expect(state.root.className).toBe('fui-CarouselAutoplayButton css-root base-root caller-root');
    expect(state.icon?.className).toBe('fui-CarouselAutoplayButton__icon caller-icon');
  });
  it('accepts an absent icon', () => {
    const state = { root: {} } as CarouselAutoplayButtonState;
    expect(useCarouselAutoplayButtonStyles_unstable(state)).toBe(state);
    expect(state.icon).toBeUndefined();
  });
});
