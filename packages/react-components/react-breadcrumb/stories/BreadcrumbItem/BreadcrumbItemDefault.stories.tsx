import * as React from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbDivider,
  partitionBreadcrumbItems,
  BreadcrumbButton,
} from '@fluentui/react-breadcrumb';
import { Menu, MenuItem, MenuList, MenuPopover, MenuTrigger } from '@fluentui/react-components';
import { MoreHorizontalRegular } from '@fluentui/react-icons';

type Item = {
  key: number;
  item: string;
};

const items: Item[] = [
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
  },
  {
    key: 4,
    item: 'Item 4',
  },
  {
    key: 5,
    item: 'Item 5',
  },
  {
    key: 6,
    item: 'Item 6',
  },
];

const { startDisplayedItems, overflowItems, endDisplayedItems } = partitionBreadcrumbItems({
  items,
  maxDisplayedItems: 4,
  overflowIndex: 2,
});

function renderItem(el: Item, isLastItem: boolean = false) {
  return (
    <React.Fragment key={`${el.key}-item`}>
      <BreadcrumbItem>
        <BreadcrumbItem>{el.item}</BreadcrumbItem>
      </BreadcrumbItem>
      {!isLastItem && <BreadcrumbDivider />}
    </React.Fragment>
  );
}

function renderMenu(menuItems: readonly Item[]) {
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
              {menuItems.map(overflowItem => (
                <MenuItem key={`menu-item-${overflowItem.key}`}>{overflowItem.item}</MenuItem>
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
    <Breadcrumb>{items.map(el => renderItem(el, el.key === items.length - 1))}</Breadcrumb>
    <Breadcrumb>
      {startDisplayedItems.map(el => renderItem(el))}
      {overflowItems && renderMenu(overflowItems)}
      {endDisplayedItems &&
        endDisplayedItems.map(el => {
          const isLastItem = el.key === items.length - 1;
          return renderItem(el, isLastItem);
        })}
    </Breadcrumb>
  </>
);
