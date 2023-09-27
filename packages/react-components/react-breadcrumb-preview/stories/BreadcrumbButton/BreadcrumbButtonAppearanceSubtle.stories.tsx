import * as React from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbButton, BreadcrumbDivider } from '@fluentui/react-breadcrumb-preview';
import { bundleIcon, CalendarMonth20Filled, CalendarMonth20Regular, GridDots20Regular } from '@fluentui/react-icons';
import { ButtonProps } from '@fluentui/react-components';

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
    item: 'Dropdown',
    buttonProps: {
      onClick: () => window.open('https://react.fluentui.dev/?path=/docs/components-dropdown--default', '_blank'),
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

export const BreadcrumbButtonAppearanceSubtle = () => {
  return (
    <Breadcrumb aria-label="Subtle breadcrumb" appearance="subtle">
      {buttonItems.map(el => renderButton(el, el.key === buttonItems.length - 1))}
    </Breadcrumb>
  );
};

BreadcrumbButtonAppearanceSubtle.parameters = {
  docs: {
    description: {
      story: 'Prop `appearance` is only for interactive items (BreadcrumbButton).',
    },
  },
};
