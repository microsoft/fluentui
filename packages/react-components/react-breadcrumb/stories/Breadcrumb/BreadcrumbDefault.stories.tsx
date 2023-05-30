import * as React from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbDivider, BreadcrumbProps } from '@fluentui/react-breadcrumb';
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
];

function renderItem(item: Item, size: BreadcrumbProps['size']) {
  const isLastItem = items.length - 1 === item.key;
  return (
    <React.Fragment key={`${size}-item-${item.key}`}>
      <BreadcrumbItem current={isLastItem}>{item.value}</BreadcrumbItem>
      {!isLastItem && <BreadcrumbDivider />}
    </React.Fragment>
  );
}
export const Default = () => (
  <>
    <Breadcrumb aria-label="Small breadcrumb example with slashes" size="small" dividerType="slash">
      {items.map(item => renderItem(item, 'small'))}
    </Breadcrumb>
    <Breadcrumb aria-label="Default breadcrumb">{items.map(item => renderItem(item, 'medium'))}</Breadcrumb>
    <Breadcrumb aria-label="Large breadcrumb" size="large">
      {items.map(item => renderItem(item, 'large'))}
    </Breadcrumb>
  </>
);
