import * as React from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbButton,
  BreadcrumbDivider,
  partitionBreadcrumbItems,
} from '@fluentui/react-breadcrumb';
import { Menu, MenuItem, MenuList, MenuPopover, MenuTrigger, Tooltip, OverflowItem } from '@fluentui/react-components';
import { MoreHorizontalRegular } from '@fluentui/react-icons';
import { buttonItems } from './data';

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
        <MenuItem>Toggle menu</MenuItem>
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

type Item = {
  key: number;
  item: any;
  icon?: any;
  buttonProps?: {
    onClick?: () => void;
    disabled?: boolean;
    iconPosition?: 'before' | 'after';
  };
};

type Items = readonly Item[];

const { startDisplayedItems, overflowItems, endDisplayedItems } = partitionBreadcrumbItems({
  items: buttonItems,
  maxDisplayedItems: 4,
  overflowIndex: 2,
});

function renderButton(el: Item, isLastItem: boolean = false) {
  const selected = isLastItem;
  return (
    <React.Fragment key={`${el.key}-button`}>
      <Tooltip content="Item this is" relationship="label">
        <OverflowItem id={`${el.key}`}>
          <BreadcrumbItem icon={el.icon}>
            <BreadcrumbButton {...el.buttonProps} selected={selected}>
              {el.item}
            </BreadcrumbButton>
          </BreadcrumbItem>
        </OverflowItem>
      </Tooltip>

      {!isLastItem && <BreadcrumbDivider />}
    </React.Fragment>
  );
}

function renderMenu(items: Items) {
  return (
    <>
      <BreadcrumbItem>
        <Menu>
          <MenuTrigger disableButtonEnhancement>
            <BreadcrumbButton>
              <MoreHorizontalRegular />
            </BreadcrumbButton>
          </MenuTrigger>
          <MenuPopover>
            <MenuList>
              {items.map(overflowItem => (
                <BreadcrumbButton
                  icon={overflowItem.icon}
                  key={`menu-item-${overflowItem.key}`}
                  {...overflowItem.buttonProps}
                >
                  {overflowItem.item}
                </BreadcrumbButton>
              ))}
            </MenuList>
          </MenuPopover>
        </Menu>
      </BreadcrumbItem>
      <BreadcrumbDivider />
    </>
  );
}

export const Default = () => (
  <>
    <Breadcrumb size="large">
      {startDisplayedItems.map(el => renderButton(el))}
      {overflowItems && renderMenu(overflowItems)}
      {endDisplayedItems &&
        endDisplayedItems.map(el => {
          const isLastItem = el.key === buttonItems.length - 1;
          return renderButton(el, isLastItem);
        })}
    </Breadcrumb>
  </>
);
