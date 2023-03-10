import * as React from 'react';
import { Breadcrumb, BreadcrumbProps, BreadcrumbItem } from '@fluentui/react-breadcrumb';

export const Default = (props: Partial<BreadcrumbProps>) => (
  <Breadcrumb {...props}>
    <BreadcrumbItem>Item 1</BreadcrumbItem>
    <BreadcrumbItem>Item 2</BreadcrumbItem>
    <BreadcrumbItem>Item 3</BreadcrumbItem>
  </Breadcrumb>
);
