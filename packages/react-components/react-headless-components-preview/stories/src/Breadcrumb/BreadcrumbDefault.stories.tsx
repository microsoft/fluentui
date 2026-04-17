import * as React from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbButton,
  BreadcrumbDivider,
} from '@fluentui/react-headless-components-preview';
import { ChevronRightRegular } from '@fluentui/react-icons';

const linkClass =
  'text-gray-500 hover:text-gray-900 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 rounded transition-colors';

export const Default = (): React.ReactNode => (
  <Breadcrumb
    aria-label="Navigation"
    className="flex items-center"
    list={{ className: 'flex items-center gap-1 list-none m-0 p-0 text-sm' }}
  >
    <BreadcrumbItem className="flex items-center">
      <BreadcrumbButton className={linkClass}>Home</BreadcrumbButton>
    </BreadcrumbItem>
    <BreadcrumbDivider className="flex items-center text-gray-400">
      <ChevronRightRegular className="h-4 w-4" />
    </BreadcrumbDivider>
    <BreadcrumbItem className="flex items-center">
      <BreadcrumbButton className={linkClass}>Settings</BreadcrumbButton>
    </BreadcrumbItem>
    <BreadcrumbDivider className="flex items-center text-gray-400">
      <ChevronRightRegular className="h-4 w-4" />
    </BreadcrumbDivider>
    <BreadcrumbItem className="flex items-center">
      <BreadcrumbButton
        current
        className="font-medium text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 rounded data-[current]:cursor-default"
      >
        Profile
      </BreadcrumbButton>
    </BreadcrumbItem>
  </Breadcrumb>
);
