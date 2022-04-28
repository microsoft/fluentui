import * as React from 'react';
import { useMenuContext_unstable } from '../contexts/menuContext';
import type { MenuContextValue } from '../contexts/menuContext';

/**
 * A test utility to mock the useMenuContext_unstable hook that relies on context selector
 * Don't forget to call `jest.mock(**\/popupContext.ts)` while using this
 * @param options Menu context values to set for testing
 */
export const mockUseMenuContext = (options: Partial<MenuContextValue> = {}) => {
  const mockContext: MenuContextValue = {
    open: false,
    setOpen: () => null,
    triggerRef: ({ current: null } as unknown) as React.MutableRefObject<HTMLElement>,
    menuPopoverRef: ({ current: null } as unknown) as React.MutableRefObject<HTMLElement>,
    openOnContext: false,
    openOnHover: false,
    isSubmenu: false,
    triggerId: 'id',
    ...options,
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (useMenuContext_unstable as jest.Mock).mockImplementation((selector: (context: MenuContextValue) => any) => {
    return selector(mockContext);
  });
};
