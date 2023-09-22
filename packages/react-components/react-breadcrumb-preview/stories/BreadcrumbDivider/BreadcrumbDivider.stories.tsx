import * as React from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbDivider } from '@fluentui/react-breadcrumb-preview';
import breadcrumbDividerBestPractices from './BreadcrumbDividerBestPractices.md';
import breadcrumbDividerDescription from './BreadcrumbDividerDescription.md';

export const BreadcrumbDividerExample = () => (
  <>
    <h2>Slash divider which can be used only for small non-clickable items</h2>
    <Breadcrumb aria-label="Breadcrumb example with slash divider" size="small" dividerType="slash">
      <BreadcrumbItem>Item</BreadcrumbItem>
      <BreadcrumbDivider />
      <BreadcrumbItem>Item</BreadcrumbItem>
      <BreadcrumbDivider />
      <BreadcrumbItem>Item</BreadcrumbItem>
    </Breadcrumb>
    <h2>Default type of the divider</h2>
    <Breadcrumb aria-label="Breadcrumb example with the divider" size="large">
      <BreadcrumbItem>Item</BreadcrumbItem>
      <BreadcrumbDivider />
      <BreadcrumbItem>Item</BreadcrumbItem>
      <BreadcrumbDivider />
      <BreadcrumbItem>Item</BreadcrumbItem>
    </Breadcrumb>
  </>
);

BreadcrumbDividerExample.parameters = {
  docs: {
    description: {
      breadcrumbDividerDescription,
      breadcrumbDividerBestPractices,
    },
  },
};
