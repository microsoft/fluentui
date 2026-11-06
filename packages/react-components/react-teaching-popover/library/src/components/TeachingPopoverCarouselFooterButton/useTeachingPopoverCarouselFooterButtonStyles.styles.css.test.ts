import { useButtonStyles_unstable } from '@fluentui/react-button';
import { useTeachingPopoverCarouselFooterButtonStyles_unstable } from './useTeachingPopoverCarouselFooterButtonStyles.styles.css';
import type { TeachingPopoverCarouselFooterButtonState } from './TeachingPopoverCarouselFooterButton.types';

jest.mock('@fluentui/react-button', () => ({
  ['useButtonStyles_unstable']: jest.fn((state: TeachingPopoverCarouselFooterButtonState) => {
    state.root.className = `base-root ${state.root.className ?? ''}`;
    return { ...state, icon: { className: 'base-icon' } };
  }),
}));

jest.mock('./TeachingPopoverCarouselFooterButton.module.css', () => ({
  root: 'root',
  brandNext: 'brand-next',
  brandPrevious: 'brand-previous',
}));

const useRun = (navType: 'prev' | 'next', popoverAppearance?: 'brand') =>
  useTeachingPopoverCarouselFooterButtonStyles_unstable({
    navType,
    popoverAppearance,
    root: { className: 'caller' },
  } as unknown as TeachingPopoverCarouselFooterButtonState).root.className;

describe('useTeachingPopoverCarouselFooterButtonStyles_unstable (CSS Modules)', () => {
  it.each(['next', 'prev'] as const)('applies the base class only for default appearance (%s)', navType => {
    expect(useRun(navType)).toBe('fui-TeachingPopoverCarouselFooterButton root base-root caller');
  });

  it('applies brand classes by nav type', () => {
    expect(useRun('next', 'brand')).toBe('fui-TeachingPopoverCarouselFooterButton root brand-next base-root caller');
    expect(useRun('prev', 'brand')).toBe(
      'fui-TeachingPopoverCarouselFooterButton root brand-previous base-root caller',
    );
  });

  it('merges the Button return value before adding local classes', () => {
    const state = {
      root: { className: 'caller' },
      navType: 'next',
      popoverAppearance: 'inverted',
    } as TeachingPopoverCarouselFooterButtonState;
    const result = useTeachingPopoverCarouselFooterButtonStyles_unstable(state);
    expect(useButtonStyles_unstable).toHaveBeenLastCalledWith(state);
    expect(result.icon?.className).toBe('base-icon');
    expect(result.root.className).toBe('fui-TeachingPopoverCarouselFooterButton root base-root caller');
    expect(result).not.toBe(state);
  });
});
