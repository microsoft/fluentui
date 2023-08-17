import * as React from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbDivider,
  truncateBreadcrumbLongName,
  truncateBreadcrumLongTooltip,
  isTruncatableBreadcrumbContent,
} from '@fluentui/react-breadcrumb-preview';
import { bundleIcon, CalendarMonth20Filled, CalendarMonth20Regular } from '@fluentui/react-icons';
import { Tooltip } from '@fluentui/react-components';
const CalendarMonth = bundleIcon(CalendarMonth20Filled, CalendarMonth20Regular);

type Item = {
  key: number;
  value: string;
};
const items: Item[] = [
  {
    key: 0,
    value: 'Item 1',
  },
  {
    key: 1,
    value: 'Item 2',
  },
  {
    key: 2,
    value: 'Item 3',
  },
  {
    key: 3,
    value: 'Item 4',
  },
  {
    key: 4,
    value: 'Item 5',
  },
  {
    key: 5,
    value: 'Item 6',
  },
];

function renderItem(item: Item) {
  const isLastItem = items.length - 1 === item.key;
  return (
    <React.Fragment key={`item-${item.key}`}>
      <BreadcrumbItem current={isLastItem}>{item.value}</BreadcrumbItem>
      {!isLastItem && <BreadcrumbDivider />}
    </React.Fragment>
  );
}

export const Default = () => {
  return (
    <>
      <h2>BreadcrumbItem with overflow</h2>
      <Breadcrumb aria-label="breadcrumb-item-example">{items.map(item => renderItem(item))}</Breadcrumb>
      <h2>BreadcrumbItem with icon</h2>
      <Breadcrumb aria-label="breadcrumb-item-icon-example">
        <BreadcrumbItem icon={<CalendarMonth />}>Item with an icon</BreadcrumbItem>
        <BreadcrumbDivider />
        <BreadcrumbItem>Item 1</BreadcrumbItem>
        <BreadcrumbDivider />
        <BreadcrumbItem>Item 2</BreadcrumbItem>
      </Breadcrumb>
    </>
  );
};
