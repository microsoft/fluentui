import { renderHook } from '@testing-library/react-hooks';
import * as React from 'react';

import { useMenu_unstable } from './useMenu';
import { useMenuContextValues_unstable } from './useMenuContextValues';

describe('useMenuContextValues_unstable', () => {
  it('should return a value for "menu"', () => {
    const { result } = renderHook(() => {
      const state = useMenu_unstable({ children: <span /> });

      return useMenuContextValues_unstable(state);
    });

    expect(result.current.menu).toMatchInlineSnapshot(`
      Object {
        "checkedValues": Object {},
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
        "triggerId": "menur0",
        "triggerRef": [Function],
      }
    `);
  });
});
