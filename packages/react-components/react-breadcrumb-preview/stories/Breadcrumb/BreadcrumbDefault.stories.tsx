import * as React from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbDivider,
  BreadcrumbProps,
  BreadcrumbButton,
  BreadcrumbLink,
} from '@fluentui/react-breadcrumb-preview';
import { RadioGroup, Radio, Label, ButtonProps } from '@fluentui/react-components';
type Item = {
  key: number;
  value: string;
  buttonProps?: {
    'aria-label'?: string;
    icon?: ButtonProps['icon'];
    disabled?: boolean;
    iconPosition?: 'before' | 'after';
  };
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

function renderItem(item: Item) {
  const isLastItem = items.length - 1 === item.key;
  return (
    <React.Fragment key={`item-${item.key}`}>
      <BreadcrumbItem current={isLastItem}>{item.value}</BreadcrumbItem>
      {!isLastItem && <BreadcrumbDivider />}
    </React.Fragment>
  );
}

function renderButton(item: Item) {
  const isLastItem = items.length - 1 === item.key;
  return (
    <React.Fragment key={`item-${item.key}`}>
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
    <React.Fragment key={`item-${item.key}`}>
      <BreadcrumbItem current={isLastItem}>
        <BreadcrumbLink>{item.value}</BreadcrumbLink>
      </BreadcrumbItem>
      {!isLastItem && <BreadcrumbDivider />}
    </React.Fragment>
  );
}

export const Default = () => {
  const [size, setSize] = React.useState('medium' as BreadcrumbProps['size']);
  const [breadcrumbType, setBreadcrumbType] = React.useState('item');
  return (
    <>
      <h2>Playground</h2>
      <div style={{ display: 'flex', flexGrow: 2 }}>
        <div>
          <Label>Size</Label>
          <RadioGroup
            aria-labelledby="breadcrumb-size"
            value={size}
            onChange={(_, data) => setSize(data.value as BreadcrumbProps['size'])}
          >
            <Radio value="small" label="Small" />
            <Radio value="medium" label="Medium" />
            <Radio value="large" label="Large" />
          </RadioGroup>
        </div>
        <div>
          <Label>Breadcrumb type</Label>
          <RadioGroup
            aria-labelledby="bredcrumb-type"
            value={breadcrumbType}
            onChange={(_, data) => setBreadcrumbType(data.value)}
          >
            <Radio value="item" label="Item" />
            <Radio value="button" label="Button" />
            <Radio value="link" label="Link" />
          </RadioGroup>
        </div>
      </div>
      <Breadcrumb aria-label="Small Breadcrumb" size={size}>
        {breadcrumbType === 'item' && items.map(item => renderItem(item))}
        {breadcrumbType === 'button' && items.map(item => renderButton(item))}
        {breadcrumbType === 'link' && items.map(item => renderLink(item))}
      </Breadcrumb>
    </>
  );
};
