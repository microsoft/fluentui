import * as React from 'react';
import { Menu } from '@fluentui/react-northstar';
import { OneDriveIcon, StarIcon, SearchIcon } from '@fluentui/react-icons-northstar';

const MenuExampleWithIcons = () => (
  <Menu defaultActiveIndex={0}>
    <Menu.Item index={0} icon={<OneDriveIcon />} />
    <Menu.Item index={1} icon={<StarIcon />} />
    <Menu.Item index={2} icon={<SearchIcon />} />
  </Menu>
);

export default MenuExampleWithIcons;
