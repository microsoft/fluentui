import * as React from 'react';
import { BreadcrumbItem } from '@fluentui/react-breadcrumb';
import { ArrowRight16Filled } from '@fluentui/react-icons';

export const Default = () => (
  <ul>
    <BreadcrumbItem>Default Item</BreadcrumbItem>
    <BreadcrumbItem divider={<ArrowRight16Filled />}>Item with custom divider</BreadcrumbItem>
    <BreadcrumbItem divider={{ variant: 'slash', size: 'small' }}>Item with slash divider</BreadcrumbItem>
    <BreadcrumbItem divider={{ variant: null }}>Item with no divider</BreadcrumbItem>
  </ul>
);
