import * as React from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbDivider,
  partitionBreadcrumbItems,
  BreadcrumbButton,
} from '@fluentui/react-breadcrumb';
import { MoreHorizontalRegular } from '@fluentui/react-icons';
import { Menu, MenuList, MenuPopover, MenuTrigger, Tooltip } from '@fluentui/react-components';
import { linkItems } from '../Breadcrumb/data';

type Item = {
  key: number;
  item: any;
  href?: string;
  icon?: any;
  disabled?: boolean;
  iconPosition?: 'before' | 'after';
};

type Items = Item[];

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
          >
            {el.item}
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Tooltip>

      {!isLastItem && <BreadcrumbDivider />}
    </React.Fragment>
  );
}
const { startDisplayedItems, overflowItems, endDisplayedItems } = partitionBreadcrumbItems({
  items: linkItems,
  maxDisplayedItems: 4,
  overflowIndex: 2,
});

function renderMenu(items: Items) {
  return (
    <>
      <BreadcrumbItem>
        <Menu>
          <MenuTrigger disableButtonEnhancement>
            <BreadcrumbButton icon={<MoreHorizontalRegular />} />
          </MenuTrigger>
          <MenuPopover>
            <MenuList>
              {items.map(overflowItem => (
                <BreadcrumbLink overflow={true} key={`menu-item-${overflowItem.key}`} href={overflowItem.href}>
                  {overflowItem.item}
                </BreadcrumbLink>
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
    <Breadcrumb size="small">{linkItems.map(el => renderLink(el, el.key === linkItems.length - 1))}</Breadcrumb>
    <Breadcrumb>{linkItems.map(el => renderLink(el, el.key === linkItems.length - 1))}</Breadcrumb>
    <Breadcrumb size="large">{linkItems.map(el => renderLink(el, el.key === linkItems.length - 1))}</Breadcrumb>

    <Breadcrumb size="large">
      {startDisplayedItems.map(el => renderLink(el))}
      {overflowItems && renderMenu(overflowItems)}
      {endDisplayedItems &&
        endDisplayedItems.map(el => {
          const isLastItem = el.key === linkItems.length - 1;
          return renderLink(el, isLastItem);
        })}
    </Breadcrumb>
  </>
);
