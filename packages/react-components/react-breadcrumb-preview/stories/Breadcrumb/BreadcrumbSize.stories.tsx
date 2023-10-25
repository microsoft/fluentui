import * as React from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbDivider, BreadcrumbButton } from '@fluentui/react-breadcrumb-preview';
import { bundleIcon, CalendarMonth20Filled, CalendarMonth20Regular } from '@fluentui/react-icons';
const CalendarMonth = bundleIcon(CalendarMonth20Filled, CalendarMonth20Regular);

export const BreadcrumbSize = () => {
  return (
    <>
      <h4>Non-interactive Breadcrumb</h4>
      <Breadcrumb aria-label="Small non-interactive breadcrumb" size="small">
        <BreadcrumbItem>Item 1</BreadcrumbItem>
        <BreadcrumbDivider />
        <BreadcrumbItem>Item 2</BreadcrumbItem>
        <BreadcrumbDivider />
        <BreadcrumbItem>Item 3</BreadcrumbItem>
        <BreadcrumbDivider />
        <BreadcrumbItem>Item 4</BreadcrumbItem>
      </Breadcrumb>
      <h4>Interactive Breadcrumb</h4>
      <Breadcrumb aria-label="Small breadcrumb example with buttons" size="small">
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
        <BreadcrumbItem>
          <BreadcrumbButton current>Item 4</BreadcrumbButton>
        </BreadcrumbItem>
      </Breadcrumb>
      <Breadcrumb aria-label="Medium breadcrumb example with buttons" size="medium">
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
        <BreadcrumbItem>
          <BreadcrumbButton current>Item 4</BreadcrumbButton>
        </BreadcrumbItem>
      </Breadcrumb>
      <Breadcrumb aria-label="Large breadcrumb example with buttons" size="large">
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
        <BreadcrumbItem>
          <BreadcrumbButton current>Item 4</BreadcrumbButton>
        </BreadcrumbItem>
      </Breadcrumb>
    </>
  );
};

BreadcrumbSize.parameters = {
  docs: {
    description: {
      story:
        'Breadcrumb `size` can be `"small"`, `"medium"` (default), or `"large"`. ' +
        'Note: BreadcrumbButton and BreadcrumbItem have different spacing in "small" size.',
    },
  },
};
