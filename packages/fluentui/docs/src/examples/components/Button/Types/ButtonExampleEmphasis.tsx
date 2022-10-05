import * as React from 'react';
import { Button, Flex } from '@fluentui/react-northstar';

const ButtonExampleEmphasis = () => (
  <Flex gap="gap.smaller">
    <Button primary>
      <Button.Content>Primary</Button.Content>
    </Button>
    <Button>
      <Button.Content>Default</Button.Content>
    </Button>
    <Button tinted>
      <Button.Content>Tinted</Button.Content>
    </Button>
  </Flex>
);

export default ButtonExampleEmphasis;
