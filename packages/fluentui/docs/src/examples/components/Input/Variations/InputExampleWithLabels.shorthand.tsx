import * as React from 'react';
import { Input, Text, Flex } from '@fluentui/react-northstar';

const InputExampleWithLabels = () => (
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
      <Text content="Internal Label:" size="large" style={{ display: 'block' }} />
      <Input label="Search" labelPosition="internal" id="internal-label" />
    </div>
  </Flex>
);

export default InputExampleWithLabels;
