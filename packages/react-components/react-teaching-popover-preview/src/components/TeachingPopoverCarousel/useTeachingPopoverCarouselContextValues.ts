import type {
  TeachingPopoverCarouselContextValues,
  TeachingPopoverCarouselState,
} from './TeachingPopoverCarousel.types';

export function useTeachingPopoverCarouselContextValues_unstable(
  state: TeachingPopoverCarouselState,
): TeachingPopoverCarouselContextValues {
  const { store, value, setValue, onPageChange, carouselWalker } = state;

  const carousel = {
    store,
    value,
    setValue,
    onPageChange,
  };

  return { carousel, carouselWalker };
}
