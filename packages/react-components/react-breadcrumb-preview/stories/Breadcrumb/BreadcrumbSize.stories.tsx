import * as React from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbDivider,
  BreadcrumbProps,
  BreadcrumbButton,
} from '@fluentui/react-breadcrumb-preview';
import { RadioGroup, Radio, Label } from '@fluentui/react-components';

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

function renderButton(item: Item) {
  const isLastItem = items.length - 1 === item.key;
  return (
    <React.Fragment key={`button-item-${item.key}`}>
      <BreadcrumbItem current={isLastItem}>
        <BreadcrumbButton>{item.value}</BreadcrumbButton>
      </BreadcrumbItem>
      {!isLastItem && <BreadcrumbDivider />}
    </React.Fragment>
  );
}

export const BreadcrumbSize = () => {
  const [dividerType, setDividerType] = React.useState('chevron' as BreadcrumbProps['dividerType']);
  return (
    <>
      Only small breadcrumbs can have `slash` divider.
      <h3>Small</h3>
      <Label>Divider type</Label>
      <RadioGroup
        aria-labelledby="radio-group-divider"
        value={dividerType}
        onChange={(_, data) => setDividerType(data.value as BreadcrumbProps['dividerType'])}
      >
        <Radio value="slash" label="Slash" />
        <Radio value="chevron" label="Chevron" />
      </RadioGroup>
      <h4>Non-interactive item</h4>
      <Breadcrumb aria-label="Small breadcrumb example with slashes" size="small" dividerType={dividerType}>
        {items.map(item => renderItem(item, 'small'))}
      </Breadcrumb>
      <h4>Breadcrumb with buttons</h4>
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
