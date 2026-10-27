import { useTeachingPopoverCarouselFooterButtonStyles_unstable } from './useTeachingPopoverCarouselFooterButtonStyles.styles.css';
import type { TeachingPopoverCarouselFooterButtonState } from './TeachingPopoverCarouselFooterButton.types';

jest.mock('@fluentui/react-button', () => ({
  // eslint-disable-next-line @typescript-eslint/naming-convention
  useButtonStyles_unstable: (state: unknown) => state,
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
  it('applies the base class only for default appearance', () => {
    expect(useRun('next')).toBe('fui-TeachingPopoverCarouselFooterButton root caller');
  });

  it('applies brand classes by nav type', () => {
    expect(useRun('next', 'brand')).toBe('fui-TeachingPopoverCarouselFooterButton root brand-next caller');
    expect(useRun('prev', 'brand')).toBe('fui-TeachingPopoverCarouselFooterButton root brand-previous caller');
  });
});
