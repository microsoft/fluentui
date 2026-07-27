'use client';

import * as React from 'react';
import type { JSXElement } from '@fluentui/react-utilities';
import { Menu, MenuTrigger, MenuPopover, MenuList, MenuItem } from '@fluentui/react-menu';
import { Button } from '@fluentui/react-button';
import { useOverflowMenu } from '@fluentui/react-overflow';

export const OverflowMenu: React.FC<{
  itemIds: string[];
  title: string;
  items: JSXElement[];
  allowFocusOnLegends?: boolean;
}> = ({ itemIds, title, items, allowFocusOnLegends = true }) => {
  const { ref, overflowCount, isOverflowing } = useOverflowMenu<HTMLButtonElement>();
  let displayLabel = title;
  displayLabel = title === '' ? `+${overflowCount} items` : `+${overflowCount} ${title}`;

  if (!isOverflowing) {
    return null;
  }
  const remainingItemsCount = itemIds.length - overflowCount;
  const menuList = [];
  for (let i = remainingItemsCount; i < itemIds.length; i++) {
    const buttonElement = items[i];
    menuList.push(
      <MenuItem
        tabIndex={-1}
        key={i}
        onClick={e => {
          const button = buttonElement.props;
          if (button.onClick) {
            button.onClick(e);
          }
        }}
      >
        {buttonElement}
      </MenuItem>,
    );
  }
  // The overflow trigger is the last option in the "listbox". A plain Button (not MenuButton) is used, and
  // "aria-expanded" is explicitly suppressed: it is not a valid attribute on role="option" (only
  // "aria-haspopup" is), and MenuTrigger would otherwise set it to true while the menu is open. Passing
  // aria-expanded={undefined} overrides MenuTrigger's value since the child's props win in the merge.
  // aria-setsize/aria-posinset announce it as "N of N" (visible options plus this button).
  const setSize = remainingItemsCount + 1;
  return (
    <Menu>
      <MenuTrigger disableButtonEnhancement>
        <Button
          ref={ref}
          {...(allowFocusOnLegends && {
            role: 'option',
            'aria-selected': false,
            'aria-setsize': setSize,
            'aria-posinset': setSize,
            'aria-expanded': undefined,
          })}
        >
          {displayLabel}
        </Button>
      </MenuTrigger>

      <MenuPopover>
        <MenuList>{menuList}</MenuList>
      </MenuPopover>
    </Menu>
  );
};
