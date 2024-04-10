import {
  CarouselContextValue,
  carouselContextDefaultValue,
  useCarouselContext_unstable,
} from '../components/TeachingPopoverCarousel/Carousel/CarouselContext';

/**
 * A test utility to mock the usePopoverContext_unstable hook that relies on context selector
 * Don't forget to call `jest.mock(**\/TeachingPopoverContext.ts)` while using this
 * @param options TeachingPopover context values to set for testing
 */
export const mockTeachingPopoverCarouselContext = (options: Partial<CarouselContextValue> = {}) => {
  const mockContext: CarouselContextValue = {
    ...carouselContextDefaultValue,
    ...options,
  };
  (useCarouselContext_unstable as jest.Mock).mockImplementation(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (selector: (context: CarouselContextValue) => any) => {
      return selector(mockContext);
    },
  );
};
