import * as React from 'react';
import { Breadcrumb } from '@fluentui/react-northstar';

const BreadcrumbExample = props => (
  <Breadcrumb aria-label="breadcrumb">
    <Breadcrumb.Item>
      <a href="">Home</a>
    </Breadcrumb.Item>
    <Breadcrumb.Divider />
    <Breadcrumb.Item>
      <a href="">Store</a>
    </Breadcrumb.Item>
    <Breadcrumb.Divider />
    <Breadcrumb.Item aria-current="page">T-shirt</Breadcrumb.Item>
  </Breadcrumb>
);

export default BreadcrumbExample;
