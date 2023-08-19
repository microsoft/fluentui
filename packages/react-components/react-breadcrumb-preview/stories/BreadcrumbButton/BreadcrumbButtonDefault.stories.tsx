import * as React from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbButton,
  BreadcrumbDivider,
  BreadcrumbProps,
} from '@fluentui/react-breadcrumb-preview';
import { bundleIcon, CalendarMonth20Filled, CalendarMonth20Regular, GridDots20Regular } from '@fluentui/react-icons';
import { ButtonProps, RadioGroup, Radio, Label } from '@fluentui/react-components';

const CalendarMonth = bundleIcon(CalendarMonth20Filled, CalendarMonth20Regular);

type Item = {
  key: number;
  item?: string;
  buttonProps?: {
    'aria-label'?: string;
    onClick?: () => void;
    icon?: ButtonProps['icon'];
    disabled?: boolean;
  };
};

const buttonItems: Item[] = [
  {
    key: 0,
    item: 'Item 0',
    buttonProps: {
      onClick: () => console.log('item 0 was clicked'),
    },
  },
  {
    key: 1,
    item: 'Item 1',
    buttonProps: {
      icon: <CalendarMonth />,
      'aria-label': 'Item 1',
      onClick: () => console.log('item 1 was clicked'),
      disabled: true,
    },
  },
  {
    key: 2,
    item: 'Item 2',
    buttonProps: {
      icon: <GridDots20Regular />,
      onClick: () => console.log('item 2 was clicked'),
    },
  },
  {
    key: 3,
    item: 'Item 3',
    buttonProps: {
      onClick: () => console.log('item 3 was clicked'),
    },
  },
  {
    key: 4,
    item: 'Item 4',
    buttonProps: {
      icon: <CalendarMonth />,
      onClick: () => console.log('item 4 was clicked'),
    },
  },
  {
    key: 5,
    item: 'Item 5',
    buttonProps: {
      disabled: true,
      onClick: () => console.log('item 5 was clicked'),
    },
  },
  {
    key: 6,
    item: 'Item 6',
    buttonProps: {
      onClick: () => console.log('item 6 was clicked'),
    },
  },
];

function renderButton(el: Item, isLastItem: boolean = false) {
  return (
    <React.Fragment key={`${el.key}-button`}>
      <BreadcrumbItem>
        <BreadcrumbButton
          {...el.buttonProps}
          current={isLastItem}
          onClick={isLastItem ? undefined : el.buttonProps?.onClick}
        >
          {el.item}
        </BreadcrumbButton>
      </BreadcrumbItem>
      {!isLastItem && <BreadcrumbDivider />}
    </React.Fragment>
  );
}
export const Default = () => {
  const [appearance, setAppearance] = React.useState('transparent' as BreadcrumbProps['appearance']);
  return (
    <>
      <Label>Appearance (see the difference on `hover`)</Label>
      <RadioGroup
        aria-labelledby="breadcrumb-appearance"
        value={appearance}
        onChange={(_, data) => setAppearance(data.value as BreadcrumbProps['appearance'])}
      >
        <Radio value="transparent" label="Transparent" />
        <Radio value="subtle" label="Subtle" />
      </RadioGroup>
      <Breadcrumb aria-label="Small breadcrumb example with BreadcrumbButton" size="small" appearance={appearance}>
        {buttonItems.map(el => renderButton(el, el.key === buttonItems.length - 1))}
      </Breadcrumb>
      <Breadcrumb aria-label="Subtle breadcrumb" appearance={appearance}>
        {buttonItems.map(el => renderButton(el, el.key === buttonItems.length - 1))}
      </Breadcrumb>
      <Breadcrumb aria-label="Large breadcrumb with BreadcrumbButton" size="large" appearance={appearance}>
        {buttonItems.map(el => renderButton(el, el.key === buttonItems.length - 1))}
      </Breadcrumb>
    </>
  );
};
