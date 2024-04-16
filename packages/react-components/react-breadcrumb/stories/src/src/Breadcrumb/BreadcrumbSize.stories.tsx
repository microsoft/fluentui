import * as React from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbDivider, BreadcrumbButton } from '@fluentui/react-components';
import { bundleIcon, CalendarMonth20Filled, CalendarMonth20Regular } from '@fluentui/react-icons';
const CalendarMonth = bundleIcon(CalendarMonth20Filled, CalendarMonth20Regular);

export const BreadcrumbSize = () => {
  return (
    <>
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
          <BreadcrumbButton icon={<CalendarMonth />} current>
            Item 4
          </BreadcrumbButton>
        </BreadcrumbItem>
      </Breadcrumb>
    </>
  );
};
