import * as React from 'react';
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  useOverflowMenu,
} from '../../../../react-components/src/index';

export const OverflowMenu: React.FC<{ itemIds: string[]; title: string; items: JSX.Element[] }> = ({
  itemIds,
  title,
  items,
}) => {
  const { ref, overflowCount, isOverflowing } = useOverflowMenu<HTMLButtonElement>();
  let displayLabel = title;
  displayLabel = title === '' ? `+${overflowCount} items` : `+${overflowCount} ${title}`;

  if (!isOverflowing) {
    return null;
  }
  const remainingItemsCount = itemIds.length - overflowCount;
  const menuList = [];
  for (let i = remainingItemsCount; i < itemIds.length; i++) {
    menuList.push(<MenuItem key={i}>{items[i]}</MenuItem>);
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
