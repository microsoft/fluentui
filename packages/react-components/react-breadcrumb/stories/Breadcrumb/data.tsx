import * as React from 'react';
import {
  Menu,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  ButtonProps,
  MenuButton,
} from '@fluentui/react-components';
import { bundleIcon, CalendarMonthFilled, CalendarMonthRegular, MoreHorizontalRegular } from '@fluentui/react-icons';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbButton,
  BreadcrumbDivider,
  partitionBreadcrumbItems,
} from '@fluentui/react-breadcrumb';
const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);
const EditorLayoutSubMenu = () => {
  return (
    <Menu>
      <MenuTrigger disableButtonEnhancement>
        <MenuItem>Editor Layout</MenuItem>
      </MenuTrigger>

      <MenuPopover>
        <MenuList>
          <MenuItem onClick={() => console.log('MenuItem was clicked')}>Split Up</MenuItem>
          <MenuItem onClick={() => console.log('MenuItem was clicked')}>Split Down</MenuItem>
          <MenuItem onClick={() => console.log('MenuItem was clicked')}>Single</MenuItem>
        </MenuList>
      </MenuPopover>
    </Menu>
  );
};

export const NestedSubmenus = () => {
  return (
    <Menu>
      <MenuTrigger disableButtonEnhancement>
        <MenuButton appearance="transparent">Item 4 Menu</MenuButton>
      </MenuTrigger>

      <MenuPopover>
        <MenuList>
          <MenuItem>Settings</MenuItem>
          <MenuItem>Online Services Settings</MenuItem>
          <MenuItem>Extensions</MenuItem>
          <EditorLayoutSubMenu />
        </MenuList>
      </MenuPopover>
    </Menu>
  );
};
export type Item = {
  key: number;
  item?: ButtonProps['icon'] | string | JSX.Element;
  href?: string;
  buttonProps?: {
    onClick?: () => void;
    icon?: ButtonProps['icon'];
    disabled?: boolean;
    iconPosition?: 'before' | 'after';
  };
};

export type Items = readonly Item[];

export const buttonItems: Items = [
  {
    key: 0,
    item: 'Item 0',
    buttonProps: {
      onClick: () => console.log('item 0 was clicked'),
    },
  },
  {
    key: 1,
    item: 'Item 1',
    buttonProps: {
      icon: <CalendarMonth />,
      onClick: () => console.log('item 1 was clicked'),
    },
  },
  {
    key: 2,
    item: 'Item 2',
    buttonProps: {
      onClick: () => console.log('item 2 was clicked'),
    },
  },
  {
    key: 3,
    item: 'Item 3',
    buttonProps: {
      onClick: () => console.log('item 3 was clicked'),
    },
  },
  {
    key: 4,
    item: <NestedSubmenus />,
    buttonProps: {
      onClick: () => console.log('item 4 was clicked'),
    },
  },
  {
    key: 5,
    item: 'Item 5',
    buttonProps: {
      icon: <CalendarMonthRegular />,
      iconPosition: 'after',
      onClick: () => console.log('item 5 was clicked'),
    },
  },
  {
    key: 6,
    item: 'Item 6',
    buttonProps: {
      onClick: () => console.log('item 6 was clicked'),
      disabled: true,
    },
  },
  {
    key: 7,
    item: 'Item 7',
    buttonProps: {
      onClick: () => console.log('item 7 was clicked'),
    },
  },
];

export const linkItems: Items = [
  {
    key: 0,
    item: 'Item 0',
    href: 'https://google.com',
  },
  {
    key: 1,
    item: 'Item 1',
    href: 'https://google.com',
    icon: <CalendarMonth />,
  },
  {
    key: 2,
    item: 'Item 2',
    href: 'https://google.com',
  },
  {
    key: 3,
    item: 'Item 3',
    href: 'https://google.com',
  },
  {
    key: 4,
    item: 'Item 4',
    href: 'https://google.com',
    icon: <CalendarMonthRegular />,
    iconPosition: 'after',
  },
  {
    key: 5,
    item: 'Item 5',
    href: 'https://google.com',
    disabled: true,
  },
  {
    key: 6,
    item: 'Item 6',
    href: 'https://google.com',
  },
];
