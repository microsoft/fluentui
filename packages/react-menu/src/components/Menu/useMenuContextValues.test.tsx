import { renderHook } from '@testing-library/react-hooks';
import * as React from 'react';

import { useMenu } from './useMenu';
import { useMenuContextValues } from './useMenuContextValues';

describe('useMenuContextValues', () => {
  it('should return a value for "menu"', () => {
    const { result } = renderHook(() => {
      const state = useMenu({ children: <span /> });

      return useMenuContextValues(state);
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
