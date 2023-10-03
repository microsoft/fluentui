import * as React from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbButton, BreadcrumbDivider } from '@fluentui/react-breadcrumb-preview';
import { bundleIcon, CalendarMonth20Filled, CalendarMonth20Regular, GridDots20Regular } from '@fluentui/react-icons';
import { ButtonProps } from '@fluentui/react-components';

const CalendarMonth = bundleIcon(CalendarMonth20Filled, CalendarMonth20Regular);

type Item = {
  key: number;
  item?: string;
  linkProps?: {
    'aria-label'?: string;
    href?: string;
    icon?: ButtonProps['icon'];
    disabled?: boolean;
  };
};

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
    item: 'Breadcrumb with Tooltip',
    linkProps: {
      disabled: true,
      href: 'https://react.fluentui.dev/?path=/docs/preview-components-breadcrumb--breadcrumb-with-tooltip',
    },
  },
  {
    key: 4,
    item: 'Breadcrumb focus mode',
    linkProps: {
      href: 'https://react.fluentui.dev/?path=/docs/preview-components-breadcrumb--breadcrumb-focus-mode',
    },
  },
];

function renderLink(el: Item, isLastItem: boolean = false) {
  if (!isLastItem) {
    return (
      <React.Fragment key={`${el.key}-link`}>
        <BreadcrumbItem>
          <BreadcrumbButton {...el.linkProps} as="a">
            {el.item}
          </BreadcrumbButton>
        </BreadcrumbItem>
        <BreadcrumbDivider />
      </React.Fragment>
    );
  } else {
    return (
      <BreadcrumbItem current={true} key={el.key}>
        {el.item}
      </BreadcrumbItem>
    );
  }
}
export const BreadcrumbButtonWithHrefAttribute = () => {
  return (
    <Breadcrumb aria-label="BreadcrumbButton with href attribute">
      {linkItems.map((el, index) => renderLink(el, index === linkItems.length - 1))}
    </Breadcrumb>
  );
};
