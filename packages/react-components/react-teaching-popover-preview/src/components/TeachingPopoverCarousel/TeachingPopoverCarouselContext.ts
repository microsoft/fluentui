import { CarouselContextValue } from './Carousel/useCarouselCollection';
import { TeachingPopoverCarouselState } from './TeachingPopoverCarousel.types';
import { type CarouselWalkerContextValue } from './Carousel/CarouselWalkerContext';

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
  const { store, value, setValue, onPageChange, carouselWalker } = state;

  const carousel = {
    store,
    value,
    setValue,
    onPageChange,
  };

  return { carousel, carouselWalker };
}
