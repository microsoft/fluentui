import * as React from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbButton, BreadcrumbDivider } from '@fluentui/react-breadcrumb';
import { Tooltip } from '@fluentui/react-components';
import { bundleIcon, CalendarMonthFilled, CalendarMonthRegular, GridDots20Regular } from '@fluentui/react-icons';

const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);

type Item = {
  key: number;
  item: any;
  onClick?: () => void;
  icon?: any;
  disabled?: boolean;
  iconPosition?: 'before' | 'after';
};

type Items = Item[];

const buttonItems: Items = [
  {
    key: 0,
    item: 'Item 0',
    onClick: () => console.log('item 0 was clicked'),
  },
  {
    key: 1,
    item: 'Item 1',
    onClick: () => console.log('item 1 was clicked'),
    icon: <CalendarMonth />,
  },
  {
    key: 2,
    item: 'Item 2',
    onClick: () => console.log('item 2 was clicked'),
    icon: <GridDots20Regular />,
  },
  {
    key: 3,
    item: 'Item 3',
    onClick: () => console.log('item 3 was clicked'),
  },
  {
    key: 4,
    item: 'Item 4',
    onClick: () => console.log('item 4 was clicked'),
    icon: <CalendarMonthRegular />,
    iconPosition: 'after',
  },
  {
    key: 5,
    item: 'Item 5',
    onClick: () => console.log('item 5 was clicked'),
    disabled: true,
  },
  {
    key: 6,
    item: 'Item 6',
    onClick: () => console.log('item 6 was clicked'),
  },
];

function renderButton(el: Item, isLastItem: boolean = false) {
  return (
    <React.Fragment key={`${el.key}-button`}>
      <Tooltip content="Item this is" relationship="label">
        <BreadcrumbItem icon={el.icon} iconPosition={el.iconPosition}>
          <BreadcrumbButton onClick={el.onClick} disabled={el.disabled}>
            {el.item}
          </BreadcrumbButton>
        </BreadcrumbItem>
      </Tooltip>

      {!isLastItem && <BreadcrumbDivider />}
    </React.Fragment>
  );
}
export const Default = () => (
  <>
    <Breadcrumb size="large">{buttonItems.map(el => renderButton(el, el.key === buttonItems.length - 1))}</Breadcrumb>
  </>
);
