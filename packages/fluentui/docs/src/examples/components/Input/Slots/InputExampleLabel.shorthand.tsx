import * as React from 'react';
import { Input, Text, Flex } from '@fluentui/react-northstar';

const InputExampleLabelShorthand = () => (
  <Flex column gap="gap.small">
    <div>
      <Text content="Default Label:" size="large" style={{ display: 'block' }} />
      <Input label="Search" />
    </div>

    <div>
      <Text content="Inline Label:" size="large" style={{ display: 'block' }} />
      <Input label="Search" labelPosition="inline" />
    </div>

    <div>
      <Text content="Inside Label:" size="large" style={{ display: 'block' }} />
      <Input label="Search" labelPosition="inside" id="inside-label" />
    </div>
  </Flex>
);

export default InputExampleLabelShorthand;
