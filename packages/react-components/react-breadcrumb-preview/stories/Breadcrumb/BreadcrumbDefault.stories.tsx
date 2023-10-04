import * as React from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbDivider,
  BreadcrumbProps,
  BreadcrumbButton,
  BreadcrumbItemProps,
} from '@fluentui/react-breadcrumb-preview';
import { CalendarMonthFilled, CalendarMonthRegular, bundleIcon } from '@fluentui/react-icons';
import { RadioGroup, Radio, Label, ButtonProps } from '@fluentui/react-components';

const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);

type Item = {
  key: number;
  value: string;
  icon?: ButtonProps['icon'] | BreadcrumbItemProps['icon'];
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

function renderItem(item: Item) {
  const isLastItem = items.length - 1 === item.key;
  return (
    <React.Fragment key={`item-${item.key}`}>
      <BreadcrumbItem icon={item.icon} current={isLastItem}>
        {item.value}
      </BreadcrumbItem>
      {!isLastItem && <BreadcrumbDivider />}
    </React.Fragment>
  );
}

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
  const [size, setSize] = React.useState('medium' as BreadcrumbProps['size']);
  const [breadcrumbType, setBreadcrumbType] = React.useState('item');
  return (
    <>
      <Breadcrumb aria-label="Small Breadcrumb" size={size}>
        <BreadcrumbItem>
          <BreadcrumbButton>Item 1</BreadcrumbButton>
        </BreadcrumbItem>
        <BreadcrumbDivider />
        <BreadcrumbItem>
          <BreadcrumbButton>Item 2</BreadcrumbButton>
        </BreadcrumbItem>
        <BreadcrumbDivider />
        <BreadcrumbItem>
          <BreadcrumbButton>Item 2</BreadcrumbButton>
        </BreadcrumbItem>
        <BreadcrumbDivider />
        <BreadcrumbItem>
          <BreadcrumbButton current>Item 2</BreadcrumbButton>
        </BreadcrumbItem>
      </Breadcrumb>
      <Breadcrumb aria-label="Small Breadcrumb" size={size}>
        <BreadcrumbItem>
          <BreadcrumbButton>Item 1</BreadcrumbButton>
        </BreadcrumbItem>
        <BreadcrumbDivider />
        <BreadcrumbItem>
          <BreadcrumbButton>Item 2</BreadcrumbButton>
        </BreadcrumbItem>
        <BreadcrumbDivider />
        <BreadcrumbItem>
          <BreadcrumbButton>Item 2</BreadcrumbButton>
        </BreadcrumbItem>
        <BreadcrumbDivider />
        <BreadcrumbItem current>Item 4</BreadcrumbItem>
      </Breadcrumb>
      Interactive
      <Breadcrumb aria-label="Small Breadcrumb" size="small">
        <BreadcrumbItem>
          <BreadcrumbButton>Item 1</BreadcrumbButton>
        </BreadcrumbItem>
        <BreadcrumbDivider />
        <BreadcrumbItem>
          <BreadcrumbButton>Item 2</BreadcrumbButton>
        </BreadcrumbItem>
        <BreadcrumbDivider />
        <BreadcrumbItem>
          <BreadcrumbButton>Item 2</BreadcrumbButton>
        </BreadcrumbItem>
        <BreadcrumbDivider />
        <BreadcrumbItem current>Item 4</BreadcrumbItem>
      </Breadcrumb>
      <Breadcrumb aria-label="Small Breadcrumb" size="small">
        <BreadcrumbItem>Item 1</BreadcrumbItem>
        <BreadcrumbDivider />
        <BreadcrumbItem>Item 2</BreadcrumbItem>
        <BreadcrumbDivider />
        <BreadcrumbItem>Item 2</BreadcrumbItem>
        <BreadcrumbDivider />
        <BreadcrumbItem current>Item 4</BreadcrumbItem>
      </Breadcrumb>
      <Breadcrumb aria-label="Small Breadcrumb" size="small">
        <BreadcrumbItem>Item 1</BreadcrumbItem>
        <BreadcrumbDivider />
        <BreadcrumbItem>Item 2</BreadcrumbItem>
        <BreadcrumbDivider />
        <BreadcrumbItem>Item 2</BreadcrumbItem>
        <BreadcrumbDivider />
        <BreadcrumbItem>
          <BreadcrumbButton current>Item 2</BreadcrumbButton>
        </BreadcrumbItem>
      </Breadcrumb>
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
            <Radio value="item" label="Non-interactive item" />
            <Radio value="button" label="Button" />
          </RadioGroup>
        </div>
      </div>
      <Breadcrumb aria-label="Small Breadcrumb" size={size}>
        {renderItem({
          key: 1000,
          value: 'This is another test',
        })}
        {breadcrumbType === 'item' && items.map(item => renderItem(item))}
        {breadcrumbType === 'button' && items.map(item => renderButton(item))}
      </Breadcrumb>
    </>
  );
};
