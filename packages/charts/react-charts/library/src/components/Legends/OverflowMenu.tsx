'use client';

import * as React from 'react';
import type { JSXElement } from '@fluentui/react-utilities';
import { Menu, MenuTrigger, MenuPopover, MenuList, MenuItemCheckbox } from '@fluentui/react-menu';
import { MenuButton } from '@fluentui/react-button';
import { useOverflowMenu, useOverflowVisibility } from '@fluentui/react-overflow';

export const OverflowMenu: React.FC<{
  itemIds: string[];
  title: string;
  items: JSXElement[];
}> = ({ itemIds, title, items }) => {
  const { ref, isOverflowing } = useOverflowMenu<HTMLButtonElement>();
  const { itemVisibility } = useOverflowVisibility();

  if (!isOverflowing) {
    return null;
  }
  const checkedLegends: string[] = [];
  const menuList = [];
  for (let index = 0; index < items.length; index++) {
    const itemId = itemIds[index];
    if (itemVisibility[itemId] !== false) {
      continue;
    }
    const buttonElement = items[index];
    const value = `${buttonElement.props['data-title'] ?? index}`;
    if (buttonElement.props['data-selected']) {
      checkedLegends.push(value);
    }
    menuList.push(
      <MenuItemCheckbox
        key={itemId}
        name="legends"
        value={value}
        // Full-list position so counts match the listbox.
        aria-setsize={itemIds.length}
        aria-posinset={index + 1}
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
  const displayLabel = title === '' ? `+${menuList.length} items` : `+${menuList.length} ${title}`;

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
