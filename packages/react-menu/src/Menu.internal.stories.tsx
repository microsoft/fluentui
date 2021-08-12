import * as React from 'react';
import { Menu, MenuTrigger, MenuList, MenuItem, MenuPopover } from './index';

export const TabstopsInternal = () => (
  <>
    <button>Tabstop</button>
    <Menu>
      <MenuTrigger>
        <button>Open menu</button>
      </MenuTrigger>
      <MenuPopover>
        <MenuList>
          <MenuItem>Item</MenuItem>
          <MenuItem>Item</MenuItem>
          <MenuItem>Item</MenuItem>
        </MenuList>
      </MenuPopover>
    </Menu>
    <button>Tabstop</button>
  </>
);

export const IframeClickDismissInternal = () => (
  <>
    <Menu>
      <MenuTrigger>
        <button>Open menu</button>
      </MenuTrigger>
      <MenuPopover>
        <MenuList>
          <MenuItem>Item</MenuItem>
          <MenuItem>Item</MenuItem>
          <MenuItem>Item</MenuItem>
        </MenuList>
      </MenuPopover>
    </Menu>

    <iframe src="https://fr.wikipedia.org" title="wikipedia" />
  </>
);
