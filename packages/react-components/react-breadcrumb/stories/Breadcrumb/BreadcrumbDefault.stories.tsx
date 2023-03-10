import * as React from 'react';
import { Breadcrumb, BreadcrumbItem } from '@fluentui/react-breadcrumb';
export const Default = () => (
  <>
    <Breadcrumb size="small">
      <BreadcrumbItem>Item 1</BreadcrumbItem>
      <BreadcrumbItem>Item 2</BreadcrumbItem>
      <BreadcrumbItem>Item 3</BreadcrumbItem>
      <BreadcrumbItem>Item 4</BreadcrumbItem>
    </Breadcrumb>
    <Breadcrumb>
      <BreadcrumbItem>Item 1</BreadcrumbItem>
      <BreadcrumbItem>Item 2</BreadcrumbItem>
      <BreadcrumbItem>Item 3</BreadcrumbItem>
      <BreadcrumbItem>Item 4</BreadcrumbItem>
    </Breadcrumb>
    <Breadcrumb size="large">
      <BreadcrumbItem>Item 1</BreadcrumbItem>
      <BreadcrumbItem>Item 2</BreadcrumbItem>
      <BreadcrumbItem>Item 3</BreadcrumbItem>
    </Breadcrumb>
  </>
);
