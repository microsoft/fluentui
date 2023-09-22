import * as React from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbDivider, BreadcrumbButton } from '@fluentui/react-breadcrumb-preview';
import { CalendarMonthFilled, CalendarMonthRegular, bundleIcon } from '@fluentui/react-icons';
import { ButtonProps } from '@fluentui/react-components';

const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);

type Item = {
  key: number;
  value: string;
  icon?: ButtonProps['icon'];
};

const items: Item[] = [
  {
    key: 0,
    value: 'Item 1',
  },
  {
    key: 1,
    value: 'Item 2',
    icon: <CalendarMonth />,
  },
  {
    key: 2,
    value: 'Item 3',
  },
  {
    key: 3,
    value: 'Item 4',
  },
];

function renderButton(item: Item) {
  const isLastItem = items.length - 1 === item.key;
  return (
    <React.Fragment key={`item-${item.key}`}>
      <BreadcrumbItem>
        <BreadcrumbButton icon={item.icon} current={isLastItem}>
          {item.value}
        </BreadcrumbButton>
      </BreadcrumbItem>
      {!isLastItem && <BreadcrumbDivider />}
    </React.Fragment>
  );
}

export const Default = () => {
  return (
    <>
      <Breadcrumb aria-label="Breadcrumb default example">{items.map(item => renderButton(item))}</Breadcrumb>
    </>
  );
};
