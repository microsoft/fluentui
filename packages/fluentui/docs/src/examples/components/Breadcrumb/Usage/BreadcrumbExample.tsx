import * as React from 'react';
import { Breadcrumb } from '@fluentui/react-northstar';

const BreadcrumbExample = props => (
  <Breadcrumb>
    <Breadcrumb.Item>Home</Breadcrumb.Item>
    <Breadcrumb.Divider />
    <Breadcrumb.Item>Registration</Breadcrumb.Item>
    <Breadcrumb.Divider />
    <Breadcrumb.Item>Personal Information</Breadcrumb.Item>
  </Breadcrumb>
);

export default BreadcrumbExample;
