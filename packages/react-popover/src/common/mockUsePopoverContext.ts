import { PopoverContextValue, usePopoverContext } from '../popoverContext';

/**
 * A test utility to mock the usePopoverContext hook that relies on context selector
 * Don't forget to call `jest.mock(**\/popupContext.ts)` while using this
 * @param options Popover context values to set for testing
 */
export const mockPopoverContext = (options: Partial<PopoverContextValue> = {}) => {
  const mockContext: PopoverContextValue = {
    target: null,
    triggerRef: { current: null },
    contentRef: { current: null },
    arrowRef: { current: null },
    open: false,
    setOpen: jest.fn(),
    mountNode: null,
    openOnContext: false,
    openOnHover: false,
    size: 'medium',
    ...options,
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (usePopoverContext as jest.Mock).mockImplementation((selector: (context: PopoverContextValue) => any) => {
    return selector(mockContext);
  });
};
