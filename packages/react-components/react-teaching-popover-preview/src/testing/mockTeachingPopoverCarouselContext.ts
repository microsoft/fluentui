import { useTeachingPopoverCarouselContextValues_unstable } from '../TeachingPopoverCarousel';
import type { TeachingPopoverCarouselContextValues } from '../TeachingPopoverCarousel';
import { carouselContextDefaultValue } from '../components/TeachingPopoverCarousel/Carousel/CarouselContext';
import { carouselWalkerContextDefaultValue } from '../components/TeachingPopoverCarousel/Carousel/CarouselWalkerContext';

/**
 * A test utility to mock the usePopoverContext_unstable hook that relies on context selector
 * Don't forget to call `jest.mock(**\/TeachingPopoverContext.ts)` while using this
 * @param options TeachingPopover context values to set for testing
 */
export const mockTeachingPopoverCarouselContext = (options: Partial<TeachingPopoverCarouselContextValues> = {}) => {
  const mockContext: TeachingPopoverCarouselContextValues = {
    carousel: carouselContextDefaultValue,
    carouselWalker: carouselWalkerContextDefaultValue,
    ...options,
  };
  (useTeachingPopoverCarouselContextValues_unstable as jest.Mock).mockImplementation(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (selector: (context: TeachingPopoverCarouselContextValues) => any) => {
      return selector(mockContext);
    },
  );
};
