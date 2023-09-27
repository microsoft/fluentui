import * as React from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbDivider, BreadcrumbButton } from '@fluentui/react-breadcrumb-preview';

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

function renderButton(item: Item) {
  const isLastItem = items.length - 1 === item.key;
  return (
    <React.Fragment key={`button-item-${item.key}`}>
      <BreadcrumbItem>
        <BreadcrumbButton current={isLastItem}>{item.value}</BreadcrumbButton>
      </BreadcrumbItem>
      {!isLastItem && <BreadcrumbDivider />}
    </React.Fragment>
  );
}

export const BreadcrumbSize = () => {
  return (
    <>
      <h3>Small</h3>
      <h4>Non-interactive Breadcrumb</h4>
      <Breadcrumb aria-label="Small non-interactive breadcrumb" size="small">
        <BreadcrumbItem>Item 1</BreadcrumbItem>
        <BreadcrumbDivider />
        <BreadcrumbItem>Item 2</BreadcrumbItem>
        <BreadcrumbDivider />
        <BreadcrumbItem>Item 3</BreadcrumbItem>
        <BreadcrumbDivider />
        <BreadcrumbItem current>Item 4</BreadcrumbItem>
      </Breadcrumb>
      <h4>Interactive Breadcrumb</h4>
      <Breadcrumb aria-label="Small breadcrumb example with buttons" size="small">
        {items.map(item => renderButton(item))}
      </Breadcrumb>
      <h3>Medium</h3>
      <Breadcrumb aria-label="Medium breadcrumb example with buttons" size="medium">
        {items.map(item => renderButton(item))}
      </Breadcrumb>
      <h3>Large</h3>
      <Breadcrumb aria-label="Large breadcrumb example with buttons" size="large">
        {items.map(item => renderButton(item))}
      </Breadcrumb>
    </>
  );
};

BreadcrumbSize.parameters = {
  docs: {
    description: {
      story:
        'Breadcrumb `size` can be `"small"`, `"medium"` (default), or `"large"`. ' +
        'Note: BreadcrumbButton and BreadcrumbItem have different spacing in "small" size.',
    },
  },
};
