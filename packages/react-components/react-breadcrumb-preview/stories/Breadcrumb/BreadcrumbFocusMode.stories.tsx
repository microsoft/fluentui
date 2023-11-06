import * as React from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbButton, BreadcrumbDivider } from '@fluentui/react-breadcrumb-preview';
import { bundleIcon, CalendarMonth20Filled, CalendarMonth20Regular } from '@fluentui/react-icons';

const CalendarMonth = bundleIcon(CalendarMonth20Filled, CalendarMonth20Regular);

export const FocusModeArrow = () => (
  <Breadcrumb aria-label="Breadcrumb with `arrow` focusMode" focusMode="arrow">
    <BreadcrumbItem>
      <BreadcrumbButton>Item 1</BreadcrumbButton>
    </BreadcrumbItem>
    <BreadcrumbDivider />
    <BreadcrumbItem>
      <BreadcrumbButton>Item 2</BreadcrumbButton>
    </BreadcrumbItem>
    <BreadcrumbDivider />
    <BreadcrumbItem>
      <BreadcrumbButton icon={<CalendarMonth />}>Item 3</BreadcrumbButton>
    </BreadcrumbItem>
    <BreadcrumbDivider />
    <BreadcrumbItem>
      <BreadcrumbButton current>Item 4</BreadcrumbButton>
    </BreadcrumbItem>
  </Breadcrumb>
);

FocusModeArrow.parameters = {
  docs: {
    description: {
      story:
        'Breadcrumb can be navigated using `"tab"` key (default) or `"arrow"` key.' +
        'When navigating via keyboard, focus will be place initially on the first breadcrumb item.',
    },
  },
};
