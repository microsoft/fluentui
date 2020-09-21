import * as React from 'react';
import { Breadcrumb, Flex } from '@fluentui/react-northstar';

const BreadcrumbExampleSizes = props => (
  <Flex column gap="gap.small">
    <Breadcrumb aria-label="breadcrumb" size="smaller">
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
    <Breadcrumb aria-label="breadcrumb" size="small">
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
    <Breadcrumb aria-label="breadcrumb" size="medium">
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
    <Breadcrumb aria-label="breadcrumb" size="large">
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
    <Breadcrumb aria-label="breadcrumb" size="larger">
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
  </Flex>
);

export default BreadcrumbExampleSizes;
