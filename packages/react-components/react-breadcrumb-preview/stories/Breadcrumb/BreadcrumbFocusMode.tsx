import * as React from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbButton, BreadcrumbDivider } from '@fluentui/react-breadcrumb-preview';
import { bundleIcon, CalendarMonth20Filled, CalendarMonth20Regular, GridDots20Regular } from '@fluentui/react-icons';
import { ButtonProps } from '@fluentui/react-button';

const CalendarMonth = bundleIcon(CalendarMonth20Filled, CalendarMonth20Regular);

type Item = {
  key: number;
  item?: string;
  buttonProps?: {
    'aria-label'?: string;
    onClick?: () => void;
    icon?: ButtonProps['icon'];
    disabled?: boolean;
    iconPosition?: 'before' | 'after';
  };
};

const buttonItems: Item[] = [
  {
    key: 0,
    item: 'Item 0',
  },
  {
    key: 1,
    buttonProps: {
      icon: <CalendarMonth />,
      'aria-label': 'Item 1',
    },
  },
  {
    key: 2,
    item: 'Item 2',
    buttonProps: {
      icon: <GridDots20Regular />,
    },
  },
  {
    key: 3,
    item: 'Item 3',
  },
  {
    key: 4,
    item: 'Item 4',
    buttonProps: {
      icon: <CalendarMonth />,
      iconPosition: 'after',
    },
  },
  {
    key: 5,
    item: 'Item 5',
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
export const BreadcrumbFocusMode = () => (
  <>
    <h2>`tab` - default</h2>
    Navigation using `tab` key.
    <Breadcrumb aria-label="Breadcrumb with `tab` focusMode">
      {buttonItems.map(el => renderButton(el, el.key === buttonItems.length - 1))}
    </Breadcrumb>
    <h2>`arrow`</h2>
    Navigation using arrow keys
    <Breadcrumb aria-label="Breadcrumb with `arrow` focusMode" focusMode="arrow">
      {buttonItems.map(el => renderButton(el, el.key === buttonItems.length - 1))}
    </Breadcrumb>
  </>
);
