import { renderHook } from '@testing-library/react-hooks';
import * as React from 'react';

import { useMenu_unstable } from './useMenu';
import { useMenuContextValues_unstable } from './useMenuContextValues';

describe('useMenuContextValues_unstable', () => {
  it('forwards autofocus suppression through the menu context', () => {
    const { result } = renderHook(() => {
      const state = useMenu_unstable({
        children: <span />,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        unstable_disableAutoFocus: true,
      });

      return useMenuContextValues_unstable(state);
    });

    expect(result.current.menu.disableAutoFocus).toBe(true);
  });

  it('should return a value for "menu"', () => {
    const { result } = renderHook(() => {
      const state = useMenu_unstable({ children: <span /> });

      return useMenuContextValues_unstable(state);
    });

    expect(result.current.menu).toMatchInlineSnapshot(`
      Object {
        "checkedValues": Object {},
        "disableAutoFocus": false,
        "hasCheckmarks": false,
        "hasIcons": false,
        "inline": false,
        "isSubmenu": false,
        "menuPopoverRef": [Function],
        "mountNode": null,
        "onCheckedValueChange": [Function],
        "open": false,
        "openOnContext": false,
        "openOnHover": false,
        "persistOnItemClick": false,
        "safeZone": null,
        "setOpen": [Function],
        "triggerId": "menu_r_1_",
        "triggerRef": [Function],
      }
    `);
  });
});
