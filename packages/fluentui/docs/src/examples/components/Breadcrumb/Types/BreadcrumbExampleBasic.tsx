import * as React from 'react';
import { Breadcrumb } from '@fluentui/react-northstar';

const BreadcrumbExample = props => (
  <Breadcrumb aria-label="breadcrumb">
    <Breadcrumb.Item>
      <Breadcrumb.Link href="">Home</Breadcrumb.Link>
    </Breadcrumb.Item>
    <Breadcrumb.Divider />
    <Breadcrumb.Item>
      <Breadcrumb.Link href="">Store</Breadcrumb.Link>
    </Breadcrumb.Item>
    <Breadcrumb.Divider />
    <Breadcrumb.Item aria-current="page">T-shirt</Breadcrumb.Item>
  </Breadcrumb>
);

export default BreadcrumbExample;
