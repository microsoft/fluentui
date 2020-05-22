import * as React from 'react';
import { Menu } from '@fluentui/react-northstar';
import { OneDriveIcon, StarIcon, SearchIcon } from '@fluentui/react-icons-northstar';

const MenuExampleWithIcons = () => (
  <Menu defaultActiveIndex={0}>
    <Menu.Item index={0}>
      <Menu.ItemIcon>
        <OneDriveIcon />
      </Menu.ItemIcon>
    </Menu.Item>
    <Menu.Item index={1}>
      <Menu.ItemIcon>
        <StarIcon />
      </Menu.ItemIcon>
    </Menu.Item>
    <Menu.Item index={2}>
      <Menu.ItemIcon>
        <SearchIcon />
      </Menu.ItemIcon>
    </Menu.Item>
  </Menu>
);

export default MenuExampleWithIcons;
