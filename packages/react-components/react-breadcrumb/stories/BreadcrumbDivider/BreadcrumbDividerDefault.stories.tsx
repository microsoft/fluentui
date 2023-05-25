import * as React from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbDivider } from '@fluentui/react-breadcrumb';
import { ArrowRight16Filled } from '@fluentui/react-icons';

export const Default = () => (
  <>
    <Breadcrumb aria-label="Breadcrumb example with slash divider" size="small" dividerType="slash">
      <BreadcrumbItem>Item</BreadcrumbItem>
      <BreadcrumbDivider />
      <BreadcrumbItem>Item</BreadcrumbItem>
      <BreadcrumbDivider />
      <BreadcrumbItem>Item</BreadcrumbItem>
    </Breadcrumb>
    <Breadcrumb aria-label="Breadcrumb example with the divider" size="large">
      <BreadcrumbItem>Item</BreadcrumbItem>
      <BreadcrumbDivider />
      <BreadcrumbItem>Item</BreadcrumbItem>
      <BreadcrumbDivider>
        <ArrowRight16Filled />
      </BreadcrumbDivider>
      <BreadcrumbItem>Item</BreadcrumbItem>
    </Breadcrumb>
  </>
);
