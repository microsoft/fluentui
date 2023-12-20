import { useTeachingPopoverContext_unstable } from '../TeachingPopoverContext';
import type { TeachingPopoverContextValue } from '../TeachingPopoverContext';

/**
 * A test utility to mock the usePopoverContext_unstable hook that relies on context selector
 * Don't forget to call `jest.mock(**\/TeachingPopoverContext.ts)` while using this
 * @param options TeachingPopover context values to set for testing
 */
export const mockTeachingPopoverContext = (options: Partial<TeachingPopoverContextValue> = {}) => {
  const mockContext: TeachingPopoverContextValue = {
    currentPage: 0,
    setCurrentPage: () => null,
    totalPages: 1, //'One-pager' default state until proven otherwise
    setTotalPages: () => null,
    appearance: undefined,
    onPageChange: () => null,
    onFinish: () => null,
    ...options,
  };
  (useTeachingPopoverContext_unstable as jest.Mock).mockImplementation(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (selector: (context: TeachingPopoverContextValue) => any) => {
      return selector(mockContext);
    },
  );
};
