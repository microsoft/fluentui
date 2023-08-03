import * as React from 'react';
import { Steps } from 'storywright';
import {
  Breadcrumb,
  BreadcrumbButton,
  BreadcrumbProps,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbDivider,
} from '@fluentui/react-breadcrumb-preview';
import { bundleIcon, CalendarMonth20Filled, CalendarMonth20Regular } from '@fluentui/react-icons';
const CalendarMonth = bundleIcon(CalendarMonth20Filled, CalendarMonth20Regular);

export const steps = new Steps()
  .snapshot('default', { cropTo: '.testWrapper' })
  .hover('.breadcrumb-sample')
  .snapshot('hover', { cropTo: '.testWrapper' })
  .mouseDown('.breadcrumb-sample')
  .snapshot('pressed', { cropTo: '.testWrapper' })
  .focus('.breadcrumb-sample')
  .snapshot('focused', { cropTo: '.testWrapper' })
  .end();

export const SampleBreadcrumbButtons = (props: BreadcrumbProps) => (
  <Breadcrumb {...props} className="breadcrumb-sample">
    <BreadcrumbItem>
      <BreadcrumbButton icon={<CalendarMonth />}>Item 1</BreadcrumbButton>
    </BreadcrumbItem>
    <BreadcrumbDivider />
    <BreadcrumbItem>
      <BreadcrumbButton disabled>Item 2</BreadcrumbButton>
    </BreadcrumbItem>
    <BreadcrumbDivider />
    <BreadcrumbItem>
      <BreadcrumbButton current>Item 3</BreadcrumbButton>
    </BreadcrumbItem>
  </Breadcrumb>
);

export const SampleBreadcrumbLinks = (props: BreadcrumbProps) => (
  <Breadcrumb {...props} className="breadcrumb-sample">
    <BreadcrumbItem>
      <BreadcrumbLink icon={<CalendarMonth />}>Item 1</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbDivider />
    <BreadcrumbItem>
      <BreadcrumbLink disabled>Item 2</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbDivider />
    <BreadcrumbItem>
      <BreadcrumbLink current>Item 3</BreadcrumbLink>
    </BreadcrumbItem>
  </Breadcrumb>
);

export const SampleBreadcrumbItems = (props: BreadcrumbProps) => (
  <Breadcrumb {...props} className="breadcrumb-sample">
    <BreadcrumbItem>Item 1</BreadcrumbItem>
    <BreadcrumbDivider />
    <BreadcrumbItem>Item 2</BreadcrumbItem>
    <BreadcrumbDivider />
    <BreadcrumbItem current>Item 3</BreadcrumbItem>
  </Breadcrumb>
);
