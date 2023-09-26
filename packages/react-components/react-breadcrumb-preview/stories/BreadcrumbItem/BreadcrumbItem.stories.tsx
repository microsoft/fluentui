import * as React from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbDivider } from '@fluentui/react-breadcrumb-preview';
import { bundleIcon, CalendarMonth20Filled, CalendarMonth20Regular } from '@fluentui/react-icons';

const CalendarMonth = bundleIcon(CalendarMonth20Filled, CalendarMonth20Regular);

export const BreadcrumbItemExample = () => {
  return (
    <>
      <Breadcrumb aria-label="breadcrumb-item-icon-example">
        <BreadcrumbItem icon={<CalendarMonth />}>Item with an icon</BreadcrumbItem>
        <BreadcrumbDivider />
        <BreadcrumbItem>Item 1</BreadcrumbItem>
        <BreadcrumbDivider />
        <BreadcrumbItem>Item 2</BreadcrumbItem>
      </Breadcrumb>
    </>
  );
};

BreadcrumbItemExample.parameters = {
  docs: {
    description: {
      story:
        'BreadcrumbItem can be used as non-interactive element or to be a container for BreadcrumbButton component.',
    },
  },
};
