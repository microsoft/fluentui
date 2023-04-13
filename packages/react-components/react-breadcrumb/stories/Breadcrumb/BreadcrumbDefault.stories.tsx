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
  return (
    <React.Fragment key={`${size}-item-${item.key}`}>
      <BreadcrumbItem>{item.value}</BreadcrumbItem>
      {items.length - 1 !== item.key && <BreadcrumbDivider />}
    </React.Fragment>
  );
}
export const Default = () => (
  <>
    <Breadcrumb size="small" dividerType="slash">
      {items.map(item => renderItem(item, 'small'))}
    </Breadcrumb>
    <Breadcrumb>{items.map(item => renderItem(item, 'medium'))}</Breadcrumb>
    <Breadcrumb size="large">{items.map(item => renderItem(item, 'large'))}</Breadcrumb>
  </>
);
