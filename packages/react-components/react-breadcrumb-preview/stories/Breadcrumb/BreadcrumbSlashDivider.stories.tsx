import * as React from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbDivider } from '@fluentui/react-breadcrumb-preview';

export const BreadcrumbSlashDivider = () => (
  <Breadcrumb aria-label="Breadcrumb example with slash divider" size="small" dividerType="slash">
    <BreadcrumbItem>Item 1</BreadcrumbItem>
    <BreadcrumbDivider />
    <BreadcrumbItem>Item 2</BreadcrumbItem>
    <BreadcrumbDivider />
    <BreadcrumbItem>Item 3</BreadcrumbItem>
  </Breadcrumb>
);

BreadcrumbSlashDivider.parameters = {
  docs: {
    description: {
      story: 'Use `slash` dividers only for small and non-interactive breadcrums. Use it to describe file paths.',
    },
  },
};
