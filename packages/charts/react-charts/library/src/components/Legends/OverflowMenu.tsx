'use client';

import * as React from 'react';
import type { JSXElement } from '@fluentui/react-utilities';
import { Menu, MenuTrigger, MenuPopover, MenuList, MenuItemCheckbox } from '@fluentui/react-menu';
import { MenuButton } from '@fluentui/react-button';
import { useOverflowMenu } from '@fluentui/react-overflow';

export const OverflowMenu: React.FC<{
  itemIds: string[];
  title: string;
  items: JSXElement[];
}> = ({ itemIds, title, items }) => {
  const { ref, overflowCount, isOverflowing } = useOverflowMenu<HTMLButtonElement>();
  let displayLabel = title;
  displayLabel = title === '' ? `+${overflowCount} items` : `+${overflowCount} ${title}`;

  if (!isOverflowing) {
    return null;
  }
  const remainingItemsCount = itemIds.length - overflowCount;
  const checkedLegends: string[] = [];
  const menuList = [];
  for (let i = remainingItemsCount; i < itemIds.length; i++) {
    const buttonElement = items[i];
    const value = `${buttonElement.props['data-title'] ?? i}`;
    if (buttonElement.props['data-selected']) {
      checkedLegends.push(value);
    }
    menuList.push(
      <MenuItemCheckbox
        key={i}
        name="legends"
        value={value}
        // Full-list position so counts match the listbox.
        aria-setsize={itemIds.length}
        aria-posinset={i + 1}
        // Hide the checkmark so the row matches the listbox legend; selection is conveyed via aria-checked.
        checkmark={null}
        onClick={e => buttonElement.props.onClick?.(e)}
        // The content is smaller than the row, so handle hover/focus on the item to cover its full area.
        onMouseEnter={() => buttonElement.props.onMouseOver?.()}
        onMouseLeave={() => buttonElement.props.onMouseOut?.()}
        onFocus={() => buttonElement.props.onFocus?.()}
        onBlur={() => buttonElement.props.onBlur?.()}
      >
        {React.cloneElement(buttonElement, {
          onClick: undefined,
          onMouseOver: undefined,
          onMouseOut: undefined,
          onFocus: undefined,
          onBlur: undefined,
        })}
      </MenuItemCheckbox>,
    );
  }
  return (
    <Menu>
      <MenuTrigger disableButtonEnhancement>
        <MenuButton ref={ref}>{displayLabel}</MenuButton>
      </MenuTrigger>

      <MenuPopover>
        <MenuList aria-label="Legends" checkedValues={{ legends: checkedLegends }}>
          {menuList}
        </MenuList>
      </MenuPopover>
    </Menu>
  );
};
