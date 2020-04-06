import * as React from 'react';
import { Flex, Segment } from '@fluentui/react-northstar';

const FlexExampleColumns = () => (
  <>
    <Flex gap="gap.small" padding="padding.medium">
      <Flex.Item size="size.half">
        <Segment content="1/2" />
      </Flex.Item>

      <Flex.Item size="size.half">
        <Segment content="1/2" />
      </Flex.Item>
    </Flex>

    <Flex gap="gap.small" padding="padding.medium">
      <Flex.Item size="size.quarter">
        <Segment content="1/4" />
      </Flex.Item>

      <Flex.Item size="size.half">
        <Segment content="1/2" />
      </Flex.Item>

      <Flex.Item size="size.quarter">
        <Segment content="1/4" />
      </Flex.Item>
    </Flex>

    <Flex gap="gap.small" padding="padding.medium" style={{ minHeight: 200 }}>
      <Flex.Item size="size.half">
        <Segment content="Full-height, even when my content doesn't fill the space." />
      </Flex.Item>

      <Flex.Item size="size.half">
        <Segment content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum mollis velit non gravida venenatis. Praesent consequat lectus purus, ut scelerisque velit condimentum eu. Maecenas sagittis ante ut turpis varius interdum. Quisque tellus ipsum, eleifend non ipsum id, suscipit ultricies neque." />
      </Flex.Item>
    </Flex>
  </>
);

export default FlexExampleColumns;
