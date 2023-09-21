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
  linkProps?: {
    'aria-label'?: string;
    href?: string;
    icon?: ButtonProps['icon'];
    disabled?: boolean;
  };
};

const buttonItems: Item[] = [
  {
    key: 0,
    item: 'Button',
    buttonProps: {
      onClick: () => window.open('https://react.fluentui.dev/?path=/docs/components-button-button--default', '_blank'),
    },
  },
  {
    key: 1,
    item: 'Breadcrumb',
    buttonProps: {
      icon: <CalendarMonth />,
      'aria-label': 'Item 1',
      disabled: true,
    },
  },
  {
    key: 2,
    item: 'Card',
    buttonProps: {
      icon: <GridDots20Regular />,
      onClick: () => window.open('https://react.fluentui.dev/?path=/docs/components-card-card--default', '_blank'),
    },
  },
  {
    key: 3,
    item: 'Checkbox',
    buttonProps: {
      onClick: () => window.open('https://react.fluentui.dev/?path=/docs/components-checkbox--default', '_blank'),
    },
  },
  {
    key: 4,
    item: 'DataGrid',
    buttonProps: {
      icon: <CalendarMonth />,
      onClick: () => window.open('https://react.fluentui.dev/?path=/docs/components-datagrid--default', '_blank'),
    },
  },
  {
    key: 5,
    item: 'Drawer',
    buttonProps: {
      disabled: true,
    },
  },
  {
    key: 6,
    item: 'Dropdown',
    buttonProps: {
      onClick: () => window.open('https://react.fluentui.dev/?path=/docs/components-dropdown--default', '_blank'),
    },
  },
];

const linkItems: Item[] = [
  {
    key: 0,
    item: 'Default',
    linkProps: {
      href: 'https://react.fluentui.dev/?path=/docs/preview-components-breadcrumb--default',
    },
  },
  {
    key: 1,
    item: 'Size',
    linkProps: {
      icon: <CalendarMonth />,
      'aria-label': 'Item 1',
      href: 'https://react.fluentui.dev/?path=/docs/preview-components-breadcrumb--breadcrumb-size',
      disabled: true,
    },
  },
  {
    key: 2,
    item: 'Overflow',
    linkProps: {
      icon: <GridDots20Regular />,
      href: 'https://react.fluentui.dev/?path=/docs/preview-components-breadcrumb--breadcrumb-with-overflow',
    },
  },
  {
    key: 3,
    item: 'Tooltip',
    linkProps: {
      href: 'https://react.fluentui.dev/?path=/docs/preview-components-breadcrumb--breadcrumb-with-tooltip',
    },
  },
  {
    key: 4,
    item: 'Focus Mode',
    linkProps: {
      icon: <CalendarMonth />,
      href: 'https://react.fluentui.dev/?path=/docs/preview-components-breadcrumb--breadcrumb-focus-mode',
    },
  },
  {
    key: 5,
    item: 'BreadcrumbButton',
    linkProps: {
      disabled: true,
      href: 'https://react.fluentui.dev/?path=/docs/preview-components-breadcrumb-breadcrumbbutton--default',
    },
  },
  {
    key: 6,
    item: 'BreadcrumbItem',
    linkProps: {
      href: 'https://react.fluentui.dev/?path=/docs/preview-components-breadcrumb-breadcrumbitem--default',
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
function renderLink(el: Item, isLastItem: boolean = false) {
  return (
    <React.Fragment key={`${el.key}-link`}>
      <BreadcrumbItem>
        <BreadcrumbButton {...el.linkProps} current={isLastItem} as="a">
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
      <RadioGroup value={appearance} onChange={(_, data) => setAppearance(data.value as BreadcrumbProps['appearance'])}>
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
      <h3>BreadcrumbButton with `href` attribute</h3>
      <Breadcrumb aria-label="BreadcrumbButton with href" size="large" appearance={appearance}>
        {linkItems.map(el => renderLink(el, el.key === linkItems.length - 1))}
      </Breadcrumb>
    </>
  );
};
