import * as React from 'react';
import { BreadcrumbDivider } from '@fluentui/react-breadcrumb';

export const Default = () => (
  <>
    <BreadcrumbDivider />
    <BreadcrumbDivider size="large" />
    <BreadcrumbDivider variant="slash" size="small" />
  </>
);
