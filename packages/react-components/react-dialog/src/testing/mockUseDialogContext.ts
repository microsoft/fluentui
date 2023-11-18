import { useDialogContext_unstable } from '../contexts/dialogContext';
import type { DialogContextValue } from '../contexts/dialogContext';

/**
 * A test utility to mock the useDialogContext_unstable hook that relies on context selector
 * Don't forget to call `jest.mock(**\/dialogContext.ts)` while using this
 * @param options Menu context values to set for testing
 */
export const mockUseDialogContext = (options: Partial<DialogContextValue> = {}) => {
  const mockContext: DialogContextValue = {
    open: false,
    modalType: 'modal',
    inertTrapFocus: false,
    isNestedDialog: false,
    dialogRef: { current: null },
    requestOpenChange() {
      /* noop */
    },
    modalAttributes: undefined,
    triggerAttributes: { 'data-tabster': '{"deloser":{}}' },
    ...options,
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (useDialogContext_unstable as jest.Mock).mockImplementation((selector: (context: DialogContextValue) => any) => {
    return selector(mockContext);
  });
};
