import { useDialogContext_unstable } from './dialogContext';
import type { DialogContextValue } from './dialogContext';

/**
 * A test utility to mock the useDialogContext_unstable hook that relies on context selector
 * Don't forget to call `jest.mock(**\/dialogContext.ts)` while using this
 * @param options Menu context values to set for testing
 */
export const mockUseDialogContext = (options: Partial<DialogContextValue> = {}) => {
  const mockContext: DialogContextValue = {
    open: false,
    modalType: 'modal',
    triggerRef: { current: null },
    contentRef: { current: null },
    requestOpenChange() {
      /* noop */
    },
    ...options,
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (useDialogContext_unstable as jest.Mock).mockImplementation((selector: (context: DialogContextValue) => any) => {
    return selector(mockContext);
  });
};
