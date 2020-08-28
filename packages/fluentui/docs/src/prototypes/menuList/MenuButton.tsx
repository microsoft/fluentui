import * as React from 'react';
import { MenuList } from './MenuList';
import { useMenu } from './useMenu';
import { MenuItem } from './MenuItem';

export function MenuButton() {
  const { triggerProps, menuListProps } = useMenu({ open: false });
  return (
    <div>
      <button {...triggerProps}>Open Menu</button>
      <MenuList {...menuListProps}>
        <MenuItem index={1}>Item 1</MenuItem>
        <MenuItem index={2}>Item 2</MenuItem>
        <MenuItem index={3}>Item 3</MenuItem>

        <MenuItem
          index={4}
          submenu={
            <>
              <MenuItem index={23}>A</MenuItem>
              <MenuItem index={22}>B</MenuItem>
              <MenuItem index={33}>C</MenuItem>
              <MenuItem
                index={41}
                submenu={
                  <>
                    <MenuItem index={223}>D</MenuItem>
                    <MenuItem index={222}>E</MenuItem>
                    <MenuItem index={332}>F</MenuItem>
                    <MenuItem index={412}>G</MenuItem>
                  </>
                }
              >
                Z
              </MenuItem>
            </>
          }
        >
          item 4
        </MenuItem>
      </MenuList>
    </div>
  );
}
