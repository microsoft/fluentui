'use client';

import * as React from 'react';
import type { JSXElement } from '@fluentui/react-utilities';
import { Menu, MenuTrigger, MenuPopover, MenuList, MenuItem } from '@fluentui/react-menu';
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
  const menuList = [];
  for (let i = remainingItemsCount; i < itemIds.length; i++) {
    const buttonElement = items[i];
    menuList.push(
      <MenuItem
        key={i}
        onClick={e => buttonElement.props.onClick?.(e)}
        // The item content is a non-interactive div that is smaller than the MenuItem, so wire hover and
        // focus on the MenuItem itself to the legend's handlers (exposed as onMouseOver/onMouseOut and
        // onFocus/onBlur). This restores the master behaviour where hovering/focusing a menu item
        // highlights the matching series and updates the legend swatch color across the item's full area.
        onMouseEnter={() => buttonElement.props.onMouseOver?.()}
        onMouseLeave={() => buttonElement.props.onMouseOut?.()}
        onFocus={() => buttonElement.props.onFocus?.()}
        onBlur={() => buttonElement.props.onBlur?.()}
      >
        {/*
          Render the legend content without its own interaction handlers so the MenuItem is the single
          interactive control and handles click/hover/focus across its full area (not just the smaller div).
        */}
        {React.cloneElement(buttonElement, {
          onClick: undefined,
          onMouseOver: undefined,
          onMouseOut: undefined,
          onFocus: undefined,
          onBlur: undefined,
        })}
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
