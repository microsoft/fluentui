import * as React from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbDivider } from '@fluentui/react-breadcrumb';
import { ArrowRight16Filled } from '@fluentui/react-icons';

export const Default = () => (
  <>
    <Breadcrumb size="small" dividerType="slash">
      <BreadcrumbItem>Item</BreadcrumbItem>
      <BreadcrumbDivider />
      <BreadcrumbItem>Item</BreadcrumbItem>
      <BreadcrumbDivider />
      <BreadcrumbItem>Item</BreadcrumbItem>
    </Breadcrumb>
    <Breadcrumb size="large">
      <BreadcrumbDivider />
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
