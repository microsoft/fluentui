import * as React from 'react';
import { Breadcrumb, Flex, ChevronEndIcon, CallControlShareIcon } from '@fluentui/react-northstar';

const BreadcrumbExampleSizes = () => (
  <Flex column gap="gap.small">
    <Breadcrumb aria-label="breadcrumb" size="smaller">
      <Breadcrumb.Item>
        <Breadcrumb.Link href="">
          <CallControlShareIcon xSpacing="after" />
          Home
        </Breadcrumb.Link>
      </Breadcrumb.Item>
      <Breadcrumb.Divider>
        <ChevronEndIcon size="smaller" />
      </Breadcrumb.Divider>
      <Breadcrumb.Item disabled>Store</Breadcrumb.Item>
      <Breadcrumb.Divider>
        <ChevronEndIcon size="smaller" />
      </Breadcrumb.Divider>
      <Breadcrumb.Item active>T-shirt</Breadcrumb.Item>
    </Breadcrumb>
    <Breadcrumb aria-label="breadcrumb" size="small">
      <Breadcrumb.Item>
        <Breadcrumb.Link href="">
          <CallControlShareIcon xSpacing="after" />
          Home
        </Breadcrumb.Link>
      </Breadcrumb.Item>
      <Breadcrumb.Divider>
        <ChevronEndIcon size="small" />
      </Breadcrumb.Divider>
      <Breadcrumb.Item disabled>Store</Breadcrumb.Item>
      <Breadcrumb.Divider>
        <ChevronEndIcon size="small" />
      </Breadcrumb.Divider>
      <Breadcrumb.Item active>T-shirt</Breadcrumb.Item>
    </Breadcrumb>
    <Breadcrumb aria-label="breadcrumb" size="medium">
      <Breadcrumb.Item>
        <Breadcrumb.Link href="">
          <CallControlShareIcon xSpacing="after" />
          Home
        </Breadcrumb.Link>
      </Breadcrumb.Item>
      <Breadcrumb.Divider>
        <ChevronEndIcon size="medium" />
      </Breadcrumb.Divider>
      <Breadcrumb.Item disabled>Store</Breadcrumb.Item>
      <Breadcrumb.Divider>
        <ChevronEndIcon size="medium" />
      </Breadcrumb.Divider>
      <Breadcrumb.Item active>T-shirt</Breadcrumb.Item>
    </Breadcrumb>
    <Breadcrumb aria-label="breadcrumb" size="large">
      <Breadcrumb.Item>
        <Breadcrumb.Link href="">
          <CallControlShareIcon xSpacing="after" />
          Home
        </Breadcrumb.Link>
      </Breadcrumb.Item>
      <Breadcrumb.Divider>
        <ChevronEndIcon size="large" />
      </Breadcrumb.Divider>
      <Breadcrumb.Item disabled>Store</Breadcrumb.Item>
      <Breadcrumb.Divider>
        <ChevronEndIcon size="large" />
      </Breadcrumb.Divider>
      <Breadcrumb.Item active>T-shirt</Breadcrumb.Item>
    </Breadcrumb>
  </Flex>
);

export default BreadcrumbExampleSizes;
