import * as React from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbButton,
  BreadcrumbDivider,
  partitionBreadcrumbItems,
  BreadcrumbLink,
} from '@fluentui/react-breadcrumb';
import { Menu, MenuItem, MenuList, MenuPopover, MenuTrigger, Tooltip, OverflowItem } from '@fluentui/react-components';
import { MoreHorizontalRegular, ArrowRight20Regular } from '@fluentui/react-icons';
import { buttonItems, Item, linkItems } from './data';

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

const { startDisplayedItems, overflowItems, endDisplayedItems } = partitionBreadcrumbItems({
  items: buttonItems,
  maxDisplayedItems: 4,
  // overflowIndex: 2,
});

function renderButton(el: Item, isLastItem: boolean = false) {
  const current = isLastItem;
  return (
    <React.Fragment key={`${el.key}-button`}>
      <Tooltip content="Item this is" relationship="label">
        <OverflowItem id={`${el.key}`}>
          <BreadcrumbItem>
            <BreadcrumbButton {...el.buttonProps} current={current}>
              {el.item}
            </BreadcrumbButton>
          </BreadcrumbItem>
        </OverflowItem>
      </Tooltip>

      {!isLastItem && <BreadcrumbDivider />}
    </React.Fragment>
  );
}

function renderMenu(items: readonly Item[]) {
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
            <MenuList style={{ alignItems: 'flex-start' }}>
              {items.map(overflowItem => (
                <BreadcrumbButton key={`menu-item-${overflowItem.key}`} {...overflowItem.buttonProps}>
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

function renderLink(el: Item, isLastItem: boolean = false) {
  return (
    <React.Fragment key={`${el.key}-button`}>
      <Tooltip content="Item this is" relationship="label">
        <BreadcrumbItem>
          <BreadcrumbLink
            href={el.href}
            icon={el.icon}
            iconPosition={el.iconPosition}
            disabled={el.disabled}
            target="_blank"
            current={isLastItem}
          >
            {el.item}
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Tooltip>

      {!isLastItem && <BreadcrumbDivider />}
    </React.Fragment>
  );
}
const items = [
  {
    key: 0,
    item: 'Item 0',
  },
  {
    key: 1,
    item: 'Item 1',
  },
  {
    key: 2,
    item: 'Item 2',
  },
  {
    key: 3,
    item: 'Item 3',
    current: true,
  },
];
export const Default = () => (
  <>
    <h2>BreadcrumbButton</h2>
    <h3>Appearance transparent</h3>
    <Breadcrumb size="large">
      {startDisplayedItems.map(el => renderButton(el))}
      {overflowItems && renderMenu(overflowItems)}
      {endDisplayedItems &&
        endDisplayedItems.map(el => {
          const isLastItem = el.key === buttonItems.length - 1;
          return renderButton(el, isLastItem);
        })}
    </Breadcrumb>
    <h3>Appearance subtle</h3>
    <Breadcrumb size="large" appearance="subtle">
      {startDisplayedItems.map(el => renderButton(el))}
      {overflowItems && renderMenu(overflowItems)}
      {endDisplayedItems &&
        endDisplayedItems.map(el => {
          const isLastItem = el.key === buttonItems.length - 1;
          return renderButton(el, isLastItem);
        })}
    </Breadcrumb>
    <h2>BreadcrumbLink</h2>
    <Breadcrumb size="large">
      {startDisplayedItems.map(el => renderLink(el))}
      {overflowItems && renderMenu(overflowItems)}
      {endDisplayedItems &&
        endDisplayedItems.map(el => {
          const isLastItem = el.key === linkItems.length;
          return renderLink(el, isLastItem);
        })}
    </Breadcrumb>
    <h2>BreadcrumbItem - non-clickable element</h2>
    <Breadcrumb size="small" dividerType="slash">
      {items.map((el, i) => (
        <React.Fragment key={`item-${el.key}`}>
          <BreadcrumbItem current={!!el.current}>{el.item}</BreadcrumbItem>
          {!el.current && <BreadcrumbDivider />}
        </React.Fragment>
      ))}
    </Breadcrumb>
    <Breadcrumb>
      {items.map((el, i) => (
        <React.Fragment key={`item-${el.key}`}>
          <BreadcrumbItem current={!!el.current}>{el.item}</BreadcrumbItem>
          {!el.current && (
            <BreadcrumbDivider>
              <ArrowRight20Regular />
            </BreadcrumbDivider>
          )}
        </React.Fragment>
      ))}
    </Breadcrumb>
    <Breadcrumb size="large">
      {items.map((el, i) => (
        <React.Fragment key={`item-${el.key}`}>
          <BreadcrumbItem current={!!el.current}>{el.item}</BreadcrumbItem>
          {!el.current && <BreadcrumbDivider />}
        </React.Fragment>
      ))}
    </Breadcrumb>
  </>
);
