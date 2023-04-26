import * as React from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbDivider,
  BreadcrumbLinkProps,
} from '@fluentui/react-breadcrumb';

import { bundleIcon, CalendarMonthFilled, CalendarMonthRegular } from '@fluentui/react-icons';
const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);
type Item = {
  key: number;
  item?: string;
  linkProps: {
    href?: string;
    icon?: BreadcrumbLinkProps['icon'];
    disabled?: boolean;
    iconPosition?: 'before' | 'after';
  };
};

const linkItems: Item[] = [
  {
    key: 0,
    item: 'Item 0',
    linkProps: {
      href: 'https://developer.microsoft.com/',
    },
  },
  {
    key: 1,
    item: 'Item 1',
    linkProps: {
      href: 'https://developer.microsoft.com/',
      icon: <CalendarMonth />,
    },
  },
  {
    key: 2,
    item: 'Item 2',
    linkProps: {
      href: 'https://developer.microsoft.com/',
    },
  },
  {
    key: 3,
    linkProps: {
      href: 'https://developer.microsoft.com/',
      icon: <CalendarMonth />,
    },
  },
  {
    key: 4,
    item: 'Item 4',
    linkProps: {
      href: 'https://developer.microsoft.com/',
      icon: <CalendarMonthRegular />,
      iconPosition: 'after',
    },
  },
  {
    key: 5,
    item: 'Item 5',
    linkProps: {
      href: 'https://developer.microsoft.com/',
      disabled: true,
    },
  },
  {
    key: 6,
    item: 'Item 6',
    linkProps: {
      href: 'https://developer.microsoft.com/',
    },
  },
];

function renderLink(el: Item, isLastItem: boolean = false) {
  return (
    <React.Fragment key={`${el.key}-button`}>
      <BreadcrumbItem>
        <BreadcrumbLink {...el.linkProps} target="_blank">
          {el.item}
        </BreadcrumbLink>
      </BreadcrumbItem>
      {!isLastItem && <BreadcrumbDivider />}
    </React.Fragment>
  );
}

export const Default = () => (
  <>
    <Breadcrumb size="small">{linkItems.map(el => renderLink(el, el.key === linkItems.length - 1))}</Breadcrumb>
    <Breadcrumb>{linkItems.map(el => renderLink(el, el.key === linkItems.length - 1))}</Breadcrumb>
    <Breadcrumb size="large">{linkItems.map(el => renderLink(el, el.key === linkItems.length - 1))}</Breadcrumb>
  </>
);
