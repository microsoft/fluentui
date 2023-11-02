import * as React from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbDivider, BreadcrumbButton } from '@fluentui/react-breadcrumb-preview';
import { CalendarMonthFilled, CalendarMonthRegular, bundleIcon } from '@fluentui/react-icons';

const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);

export const Default = () => {
  return (
    <>
      <Breadcrumb aria-label="Breadcrumb default example">
        <BreadcrumbItem>
          <BreadcrumbButton href="https://react.fluentui.dev/?path=/docs/preview-components-breadcrumb--default">
            Item 1
          </BreadcrumbButton>
        </BreadcrumbItem>
        <BreadcrumbDivider />
        <BreadcrumbItem>
          <BreadcrumbButton
            href="https://react.fluentui.dev/?path=/docs/preview-components-breadcrumb--breadcrumb-size"
            icon={<CalendarMonth />}
          >
            Item 2
          </BreadcrumbButton>
        </BreadcrumbItem>
        <BreadcrumbDivider />
        <BreadcrumbItem>
          <BreadcrumbButton href="https://react.fluentui.dev/?path=/docs/preview-components-breadcrumb--breadcrumb-with-overflow">
            Item 3
          </BreadcrumbButton>
        </BreadcrumbItem>
        <BreadcrumbDivider />
        <BreadcrumbItem>
          <BreadcrumbButton
            href="https://react.fluentui.dev/?path=/docs/preview-components-breadcrumb--breadcrumb-with-tooltip"
            current
          >
            Item 4
          </BreadcrumbButton>
        </BreadcrumbItem>
      </Breadcrumb>
    </>
  );
};
