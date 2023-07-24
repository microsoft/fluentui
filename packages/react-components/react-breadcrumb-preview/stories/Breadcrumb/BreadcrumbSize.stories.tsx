import * as React from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbDivider, BreadcrumbProps } from '@fluentui/react-breadcrumb-preview';
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
      <h2>Medium</h2>
      <Breadcrumb aria-label="Default breadcrumb">{items.map(item => renderItem(item, 'medium'))}</Breadcrumb>
      <h2>Large</h2>
      <Breadcrumb aria-label="Large breadcrumb" size="large">
        {items.map(item => renderItem(item, 'large'))}
      </Breadcrumb>
    </>
  );
};
