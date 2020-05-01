import * as React from 'react';
import { Flex, Segment } from '@fluentui/react-northstar';

const FlexExampleMixedAlignment = () => (
  <Flex gap="gap.small" hAlign="center" vAlign="center" debug>
    <Flex.Item align="start" size="size.small">
      <Segment content="This cell should be top aligned." />
    </Flex.Item>

    <Flex.Item align="stretch" size="size.small">
      <Segment content="Curabitur pulvinar dolor lectus, quis porta turpis ullamcorper nec. Quisque eget varius turpis, quis iaculis nibh. Ut interdum ligula id metus hendrerit cursus. Integer eu leo felis. Aenean commodo ultrices nunc, sit amet blandit elit gravida in. Sed est ligula, ornare ac nisi adipiscing, iaculis facilisis tellus." />
    </Flex.Item>

    <Flex.Item align="center" size="size.small">
      <Segment content="This cell should be center-aligned." />
    </Flex.Item>

    <Flex.Item align="end" size="size.small">
      <Segment content="This cell should be bottom-aligned." />
    </Flex.Item>
  </Flex>
);

export default FlexExampleMixedAlignment;
