import * as React from 'react';
import { Menu } from '@fluentui/react-northstar';
import { OneDriveIcon, StarIcon, SearchIcon } from '@fluentui/react-icons-northstar';

const items = [
  {
    icon: <OneDriveIcon />,
    key: 'onedrive',
  },
  {
    icon: <StarIcon />,
    key: 'star',
  },
  {
    icon: <SearchIcon />,
    key: 'search',
  },
];

const MenuExampleWithIcons = () => <Menu defaultActiveIndex={0} items={items} />;

export default MenuExampleWithIcons;
