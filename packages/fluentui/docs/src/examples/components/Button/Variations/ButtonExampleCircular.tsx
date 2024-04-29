import * as React from 'react';
import { Button, Flex } from '@fluentui/react-northstar';
import { MicIcon, CallVideoIcon } from '@fluentui/react-icons-northstar';

const ButtonExampleCircular = () => (
  <Flex gap="gap.smaller">
    <Button circular>
      <Button.Content>C</Button.Content>
    </Button>
    <Button circular icon title="Mic">
      <MicIcon xSpacing="none" />
    </Button>
    <Button circular icon primary title="Call Video">
      <CallVideoIcon xSpacing="none" />
    </Button>
  </Flex>
);

export default ButtonExampleCircular;
