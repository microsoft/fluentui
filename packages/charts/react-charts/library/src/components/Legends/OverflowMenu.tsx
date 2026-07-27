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
        // Position within the full legend list (visible + overflow), so counts stay consistent whether a
        // legend is shown in the listbox or the overflow menu: "index of total".
        aria-setsize={itemIds.length}
        aria-posinset={i + 1}
        // Suppress the checkmark slot so the row layout matches the plain menu item; selection is still
        // announced via aria-checked (role="menuitemcheckbox") and shown visually by the legend swatch color.
        checkmark={null}
        onClick={e => buttonElement.props.onClick?.(e)}
        // The item content is a non-interactive div that is smaller than the MenuItem, so wire hover and
        // focus on the MenuItemCheckbox itself to the legend's handlers (exposed as onMouseOver/onMouseOut
        // and onFocus/onBlur). This highlights the matching series and updates the legend swatch color
        // across the item's full area.
        onMouseEnter={() => buttonElement.props.onMouseOver?.()}
        onMouseLeave={() => buttonElement.props.onMouseOut?.()}
        onFocus={() => buttonElement.props.onFocus?.()}
        onBlur={() => buttonElement.props.onBlur?.()}
      >
        {/*
          Render the legend content without its own interaction handlers so the MenuItemCheckbox is the
          single interactive control and handles click/hover/focus across its full area (not just the div).
        */}
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
