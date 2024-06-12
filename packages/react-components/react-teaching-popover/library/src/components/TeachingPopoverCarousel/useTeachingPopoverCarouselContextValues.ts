import type {
  TeachingPopoverCarouselContextValues,
  TeachingPopoverCarouselState,
} from './TeachingPopoverCarousel.types';

export function useTeachingPopoverCarouselContextValues_unstable(
  state: TeachingPopoverCarouselState,
): TeachingPopoverCarouselContextValues {
  const { store, value, selectPageByValue, selectPageByDirection } = state;

  const carousel = {
    store,
    value,
    selectPageByDirection,
    selectPageByValue,
  };

  return { carousel };
}
