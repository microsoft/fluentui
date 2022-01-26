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
        "defaultCheckedValues": undefined,
        "hasCheckmarks": undefined,
        "hasIcons": undefined,
        "inline": undefined,
        "isSubmenu": false,
        "menuPopoverRef": Object {
          "current": null,
        },
        "onCheckedValueChange": [Function],
        "open": false,
        "openOnContext": undefined,
        "openOnHover": false,
        "persistOnItemClick": undefined,
        "setOpen": [Function],
        "triggerId": "menu1",
        "triggerRef": Object {
          "current": null,
        },
      }
    `);
  });
});
