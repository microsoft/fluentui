import { CarouselContextValue } from './Carousel/useCarouselCollection';
import { CarouselWalkerContextValue } from './Carousel/useCarouselWalker';
import { TeachingPopoverCarouselState } from './TeachingPopoverCarousel.types';

/**
 * Context shared between TeachingPopoverCarousel and its children components
 */
export type TeachingPopoverCarouselContextValues = {
  carousel: CarouselContextValue;
  carouselWalker: CarouselWalkerContextValue;
};

export function useTeachingPopoverCarouselContextValues_unstable(
  state: TeachingPopoverCarouselState,
): TeachingPopoverCarouselContextValues {
  const { store, value, setValue, setIndex, onPageChange, totalPages, currentIndex, find, nextPage, prevPage, active } =
    state;

  const carousel = {
    store,
    value,
    setValue,
    setIndex,
    onPageChange,
    totalPages,
    currentIndex,
  };

  const carouselWalker = { find, nextPage, prevPage, active };

  return { carousel, carouselWalker };
}
