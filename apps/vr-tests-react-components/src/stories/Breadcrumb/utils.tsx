import * as React from 'react';
import { Steps } from 'storywright';
import {
  Breadcrumb,
  BreadcrumbButton,
  BreadcrumbProps,
  BreadcrumbItem,
  BreadcrumbDivider,
} from '@fluentui/react-breadcrumb';
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
