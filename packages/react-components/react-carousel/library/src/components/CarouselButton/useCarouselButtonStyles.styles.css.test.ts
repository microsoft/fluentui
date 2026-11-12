import { useCarouselButtonStyles_unstable } from './useCarouselButtonStyles.styles.css';
import type { CarouselButtonState } from './CarouselButton.types';

jest.mock('./CarouselButton.module.css', () => ({ root: 'css-root' }));
jest.mock('@fluentui/react-button', () => ({
  ['useButtonStyles_unstable']: jest.fn((state: { root: { className?: string } }) => {
    state.root.className = `base-root ${state.root.className ?? ''}`;
    return state;
  }),
}));

describe('useCarouselButtonStyles_unstable (CSS Modules)', () => {
  it('composes the public base hook and preserves caller classes last', () => {
    const state = { root: { className: 'caller-root' }, icon: { className: 'caller-icon' } } as CarouselButtonState;
    expect(useCarouselButtonStyles_unstable(state)).toEqual(state);
    expect(state.root.className).toBe('fui-CarouselButton css-root base-root caller-root');
    expect(state.icon?.className).toBe('fui-CarouselButton__icon caller-icon');
  });
  it('accepts an absent icon', () => {
    const state = { root: {} } as CarouselButtonState;
    expect(useCarouselButtonStyles_unstable(state)).toEqual(state);
    expect(state.icon).toBeUndefined();
  });
});
