import * as React from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbDivider,
  partitionBreadcrumbItems,
  BreadcrumbButton,
} from '@fluentui/react-breadcrumb';
import {
  bundleIcon,
  CalendarMonthFilled,
  CalendarMonthRegular,
  GridDots20Regular,
  ArrowRight16Filled,
} from '@fluentui/react-icons';
import { Menu, MenuItem, MenuList, MenuPopover, MenuTrigger, Tooltip, OverflowItem } from '@fluentui/react-components';
import { MoreHorizontalRegular } from '@fluentui/react-icons';

const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);

type Item = {
  key: number;
  item: any;
  icon?: any;
  disabled?: boolean;
  iconPosition?: 'before' | 'after';
};

type Items = Item[];

const items: Items = [
  {
    key: 0,
    item: 'Item 0',
  },
  {
    key: 1,
    item: 'Item 1',
    icon: <CalendarMonth />,
  },
  {
    key: 2,
    item: 'Item 2',
    icon: <GridDots20Regular />,
  },
  {
    key: 3,
    item: 'Item 3',
  },
  {
    key: 4,
    item: 'Item 4',
    icon: <CalendarMonthRegular />,
    iconPosition: 'after',
  },
  {
    key: 5,
    item: 'Item 5',
    disabled: true,
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
        <BreadcrumbItem icon={el.icon} iconPosition={el.iconPosition}>
          {el.item}
        </BreadcrumbItem>
      </BreadcrumbItem>
      {!isLastItem && (
        <BreadcrumbDivider>
          <ArrowRight16Filled />
        </BreadcrumbDivider>
      )}
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
                <MenuItem icon={overflowItem.icon} key={`menu-item-${overflowItem.key}`}>
                  {overflowItem.item}
                </MenuItem>
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
