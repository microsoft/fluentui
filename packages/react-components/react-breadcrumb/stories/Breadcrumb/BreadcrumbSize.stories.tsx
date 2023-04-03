import * as React from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbDivider } from '@fluentui/react-breadcrumb';
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
];
export const BreadcrumbSize = () => (
  <>
    <Breadcrumb size="small">
      {items.map((el, i) => (
        <React.Fragment key={`item-${el.key}`}>
          <BreadcrumbItem>{el.item}</BreadcrumbItem>
          {items.length !== i && <BreadcrumbDivider />}
        </React.Fragment>
      ))}
    </Breadcrumb>
    <Breadcrumb>
      {items.map((el, i) => (
        <React.Fragment key={`item-${el.key}`}>
          <BreadcrumbItem>{el.item}</BreadcrumbItem>
          {items.length !== i && <BreadcrumbDivider />}
        </React.Fragment>
      ))}
    </Breadcrumb>
    <Breadcrumb size="large">
      {items.map((el, i) => (
        <React.Fragment key={`item-${el.key}`}>
          <BreadcrumbItem>{el.item}</BreadcrumbItem>
          {items.length !== i && <BreadcrumbDivider />}
        </React.Fragment>
      ))}
    </Breadcrumb>
  </>
);
