import { useTeachingPopoverCarouselNavButtonStyles_unstable } from './useTeachingPopoverCarouselNavButtonStyles.styles.css';
import type { TeachingPopoverCarouselNavButtonState } from './TeachingPopoverCarouselNavButton.types';

jest.mock('./TeachingPopoverCarouselNavButton.module.css', () => ({
  root: 'root',
  selected: 'selected',
  unselected: 'unselected',
  brand: 'brand',
}));

const useRun = (isSelected: boolean, appearance?: 'brand') => {
  const state = {
    isSelected,
    appearance,
    root: { className: 'caller' },
  } as unknown as TeachingPopoverCarouselNavButtonState;
  return useTeachingPopoverCarouselNavButtonStyles_unstable(state).root.className;
};

describe('useTeachingPopoverCarouselNavButtonStyles_unstable (CSS Modules)', () => {
  it('maps selected and unselected', () => {
    expect(useRun(true)).toBe('fui-TeachingPopoverCarouselNavButton root selected caller');
    expect(useRun(false)).toBe('fui-TeachingPopoverCarouselNavButton root unselected caller');
  });

  it('adds brand on the same root', () => {
    expect(useRun(true, 'brand')).toBe('fui-TeachingPopoverCarouselNavButton root selected brand caller');
    expect(useRun(false, 'brand')).toBe('fui-TeachingPopoverCarouselNavButton root unselected brand caller');
  });
});
