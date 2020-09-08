import * as React from 'react';
import { Breadcrumb } from '@fluentui/react-northstar';
import { ChevronEndMediumIcon } from '@fluentui/react-icons-northstar';

const BreadcrumbExampleIconDivider = props => (
  <Breadcrumb aria-label="breadcrumb">
    <Breadcrumb.Item>Location</Breadcrumb.Item>
    <Breadcrumb.Divider content=":" />
    <Breadcrumb.Item>
      <a href="">Home</a>
    </Breadcrumb.Item>
    <Breadcrumb.Divider><ChevronEndMediumIcon /></Breadcrumb.Divider>
    <Breadcrumb.Item>
      <a href="">Store</a>
    </Breadcrumb.Item>
    <Breadcrumb.Divider content={<ChevronEndMediumIcon />} />
    <Breadcrumb.Item aria-current="page">T-shirt</Breadcrumb.Item>
  </Breadcrumb>
);

export default BreadcrumbExampleIconDivider;
