import * as React from 'react';
import { Menu, MenuTrigger, MenuPopover, MenuList, MenuItem } from '@fluentui/react-menu';
import { MenuButton } from '@fluentui/react-button';
import { useOverflowMenu } from '@fluentui/react-overflow';
import { ILegendsOverflowStylesOverrides } from './Legends.types';

export const OverflowMenu: React.FC<{
  itemIds: string[];
  title: string;
  items: JSX.Element[];
  overflowItemStyles: ILegendsOverflowStylesOverrides;
}> = ({ itemIds, title, items, overflowItemStyles }) => {
  const { ref, overflowCount, isOverflowing } = useOverflowMenu<HTMLButtonElement>();
  let displayLabel = title;
  displayLabel = title === '' ? `+${overflowCount} items` : `+${overflowCount} ${title}`;

  if (!isOverflowing) {
    return null;
  }
  const remainingItemsCount = itemIds.length - overflowCount;
  const menuList = [];
  for (let i = remainingItemsCount; i < itemIds.length; i++) {
    menuList.push(
      <MenuItem
        tabIndex={-1}
        key={i}
        style={{ ...(typeof overflowItemStyles?.item === 'object' ? overflowItemStyles?.item : {}) }}
      >
        {items[i]}
      </MenuItem>,
    );
  }
  return (
    <Menu>
      <MenuTrigger disableButtonEnhancement>
        <MenuButton ref={ref}>{displayLabel}</MenuButton>
      </MenuTrigger>

      <MenuPopover>
        <MenuList>{menuList}</MenuList>
      </MenuPopover>
    </Menu>
  );
};
