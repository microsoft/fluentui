import { PopupContextValue, usePopupContext } from '../popupContext';

/**
 * A test utility to mock the usePopupContext hook that relies on context selector
 * Don't forget to call `jest.mock(**\/popupContext.ts)` while using this
 * @param options Popup context values to set for testing
 */
export const mockPopupContext = (options: Partial<PopupContextValue> = {}) => {
  const mockContext: PopupContextValue = {
    target: null,
    triggerRef: { current: null },
    contentRef: { current: null },
    open: false,
    setOpen: jest.fn(),
    mountNode: null,
    openOnContext: false,
    openOnHover: false,
    ...options,
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (usePopupContext as jest.Mock).mockImplementation((selector: (context: PopupContextValue) => any) => {
    return selector(mockContext);
  });
};
