import { useTeachingPopoverCarouselContext_unstable } from '../TeachingPopoverCarousel';
import type { TeachingPopoverCarouselContextValue } from '../TeachingPopoverCarousel';

/**
 * A test utility to mock the usePopoverContext_unstable hook that relies on context selector
 * Don't forget to call `jest.mock(**\/TeachingPopoverContext.ts)` while using this
 * @param options TeachingPopover context values to set for testing
 */
export const mockTeachingPopoverCarouselContext = (options: Partial<TeachingPopoverCarouselContextValue> = {}) => {
  const mockContext: TeachingPopoverCarouselContextValue = {
    currentPage: 0,
    setCurrentPage: () => null,
    totalPages: 1,
    onPageChange: () => null,
    ...options,
  };
  (useTeachingPopoverCarouselContext_unstable as jest.Mock).mockImplementation(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (selector: (context: TeachingPopoverCarouselContextValue) => any) => {
      return selector(mockContext);
    },
  );
};
