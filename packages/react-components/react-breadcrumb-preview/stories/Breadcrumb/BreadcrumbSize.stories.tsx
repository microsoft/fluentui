import * as React from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbDivider,
  BreadcrumbProps,
  BreadcrumbButton,
  BreadcrumbLink,
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

function renderLink(item: Item) {
  const isLastItem = items.length - 1 === item.key;
  return (
    <React.Fragment key={`link-item-${item.key}`}>
      <BreadcrumbItem current={isLastItem}>
        <BreadcrumbLink>{item.value}</BreadcrumbLink>
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
      <h2>Small</h2>
      <Label>Divider type</Label>
      <RadioGroup
        aria-labelledby="radio-group-divider"
        value={dividerType}
        onChange={(_, data) => setDividerType(data.value as BreadcrumbProps['dividerType'])}
      >
        <Radio value="slash" label="Slash" />
        <Radio value="chevron" label="Chevron" />
      </RadioGroup>
      <Breadcrumb aria-label="Small breadcrumb example with slashes" size="small" dividerType={dividerType}>
        {items.map(item => renderItem(item, 'small'))}
      </Breadcrumb>
      <Breadcrumb aria-label="Small breadcrumb example with buttons" size="small">
        {items.map(item => renderButton(item))}
      </Breadcrumb>
      <Breadcrumb aria-label="Small breadcrumb example with links" size="small">
        {items.map(item => renderLink(item))}
      </Breadcrumb>
      <h2>Medium</h2>
      <Breadcrumb aria-label="Medium breadcrumb example with buttons" size="medium">
        {items.map(item => renderButton(item))}
      </Breadcrumb>
      <Breadcrumb aria-label="Medium breadcrumb example with links" size="medium">
        {items.map(item => renderLink(item))}
      </Breadcrumb>
      <h2>Large</h2>
      <Breadcrumb aria-label="Large breadcrumb example with buttons" size="large">
        {items.map(item => renderButton(item))}
      </Breadcrumb>
      <Breadcrumb aria-label="Large breadcrumb example with links" size="large">
        {items.map(item => renderLink(item))}
      </Breadcrumb>
    </>
  );
};
