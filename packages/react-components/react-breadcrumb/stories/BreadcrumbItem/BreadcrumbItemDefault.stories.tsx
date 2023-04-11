import * as React from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbDivider } from '@fluentui/react-breadcrumb';
import { ArrowRight16Filled } from '@fluentui/react-icons';

export const Default = () => (
  <Breadcrumb>
    <BreadcrumbItem>Item with custom divider</BreadcrumbItem>
    <BreadcrumbDivider>
      <ArrowRight16Filled />
    </BreadcrumbDivider>
    <BreadcrumbItem>Item</BreadcrumbItem>
    <BreadcrumbDivider />
    <BreadcrumbItem>Item</BreadcrumbItem>
  </Breadcrumb>
);
