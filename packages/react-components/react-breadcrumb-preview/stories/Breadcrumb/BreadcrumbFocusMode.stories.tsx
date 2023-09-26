import * as React from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbButton, BreadcrumbDivider } from '@fluentui/react-breadcrumb-preview';
import { bundleIcon, CalendarMonth20Filled, CalendarMonth20Regular } from '@fluentui/react-icons';
import { ButtonProps } from '@fluentui/react-components';

const CalendarMonth = bundleIcon(CalendarMonth20Filled, CalendarMonth20Regular);

type Item = {
  key: number;
  item?: string;
  buttonProps?: {
    'aria-label'?: string;
    icon?: ButtonProps['icon'];
  };
};

const buttonItems: Item[] = [
  {
    key: 0,
    item: 'Item 0',
  },
  {
    key: 1,
    item: 'Item 1',
    buttonProps: {
      icon: <CalendarMonth />,
      'aria-label': 'Item 1',
    },
  },
  {
    key: 2,
    item: 'Item 2',
  },
  {
    key: 3,
    item: 'Item 3',
  },
];

function renderButton(el: Item, isLastItem: boolean = false) {
  return (
    <React.Fragment key={`${el.key}-button`}>
      <BreadcrumbItem>
        <BreadcrumbButton {...el.buttonProps} current={isLastItem}>
          {el.item}
        </BreadcrumbButton>
      </BreadcrumbItem>
      {!isLastItem && <BreadcrumbDivider />}
    </React.Fragment>
  );
}
export const FocusModeArrow = () => (
  <Breadcrumb aria-label="Breadcrumb with `arrow` focusMode" focusMode="arrow">
    {buttonItems.map(el => renderButton(el, el.key === buttonItems.length - 1))}
  </Breadcrumb>
);
