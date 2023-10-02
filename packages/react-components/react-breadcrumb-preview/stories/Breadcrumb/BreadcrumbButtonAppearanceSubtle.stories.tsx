import * as React from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbButton, BreadcrumbDivider } from '@fluentui/react-breadcrumb-preview';
import { bundleIcon, CalendarMonth20Filled, CalendarMonth20Regular } from '@fluentui/react-icons';

const CalendarMonth = bundleIcon(CalendarMonth20Filled, CalendarMonth20Regular);

export const BreadcrumbButtonAppearanceSubtle = () => {
  return (
    <Breadcrumb aria-label="Subtle breadcrumb" appearance="subtle">
      <BreadcrumbItem>
        <BreadcrumbButton>Item 1</BreadcrumbButton>
      </BreadcrumbItem>
      <BreadcrumbDivider />
      <BreadcrumbItem>
        <BreadcrumbButton icon={<CalendarMonth />}>Item 2</BreadcrumbButton>
      </BreadcrumbItem>
      <BreadcrumbDivider />
      <BreadcrumbItem>
        <BreadcrumbButton>Item 3</BreadcrumbButton>
      </BreadcrumbItem>
      <BreadcrumbDivider />
      <BreadcrumbItem current>Item 4</BreadcrumbItem>
    </Breadcrumb>
  );
};

BreadcrumbButtonAppearanceSubtle.parameters = {
  docs: {
    description: {
      story:
        'Prop `appearance` is only for interactive items (BreadcrumbButton).' +
        'Appearance can be `"transparent"` (default) or `"subtle"`.',
    },
  },
};
